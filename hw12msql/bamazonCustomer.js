var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT item_id AS 'Item ID', product_name AS 'Item Name', department_name AS 'Department', price AS 'Price($)', stock_quantity AS 'Quantity'  FROM itemList", function(err, res) {
    if (err) throw err;

    var aItems = JSON.stringify(res, null, 2)

    console.log("Available Items: " + aItems);

    okStart();
  })};

function okStart() {
  inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'shopping',
      message: 'Would you like to make a purchase from the items above?'
    }
  ])
  .then(answers => {
    if (answers.shopping) {
  
          inquirer
          .prompt([
            {
              type: 'list',
              name: 'item',
              message: 'Select the ID for the Item you would like to purchase',
              choices: ['1', '2', '3','4','5', '6', '7', '8', '9', '10']
            },
            {
              type: 'input',
              name: 'quantity',
              message: 'How many of the item would you like to buy?',
            }

          ])
          .then(function(selection) {

            connection.query("SELECT stock_quantity AS 'quantity', price AS price FROM itemList WHERE item_id = " + parseInt(selection.item), function(err, res) {
              if (err) throw err;
          
              var quantity = parseInt(res[0].quantity)
              var price = parseInt(res[0].price)
              if (quantity < selection.quantity) {
                console.log("I'm sorry, isufficient quantity");
                shopAgain();
                
              } else {

                quantity = quantity - selection.quantity

                connection.query("UPDATE itemList SET stock_quantity = " + quantity + " WHERE item_id = " + parseInt(selection.item), function(err, res) {
                  if (err) throw err;
                  console.log("Thank you for shopping, your total is $" + price * selection.quantity)
                  shopAgain();
                });
              }
          });

        })
    } else {
      console.log("Thank you for stopping by!")
      shopAgain();
    }
  });
}

function shopAgain() {
  inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'shopAgain',
      message: 'Would you like to view the store again?'
    }
  ])
  .then(answers => {
    if (answers.shopAgain) {
      afterConnection()
    } else {
      shopAgain();
    }
  });
}





  
