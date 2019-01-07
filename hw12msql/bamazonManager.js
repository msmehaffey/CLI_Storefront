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
  managerView();
});

function managerView() {
    inquirer
  .prompt([
    {
        type: 'list',
        name: 'action',
        message: 'How would you like to proceed?',
        choices: [

            'View Products for Sale', 
            'View Low Inventory', 
            'Add to Inventory', 
            'Add New Product'
        ]
      }
  ])
  .then(answers => {
      if (answers.action === 'View Products for Sale') {
          viewProducts();
      }else if (answers.action === 'View Low Inventory') {
          viewLowInventory();
      }else if (answers.action === 'Add to Inventory') {
          addToInventory();
      }else if (answers.action === 'Add New Product') {
          addNewProduct();
      }
  });
};

function viewProducts() {
    connection.query("SELECT item_id AS 'Item ID', product_name AS 'Item Name', department_name AS 'Department', price AS 'Price($)', stock_quantity AS 'Quantity'  FROM itemList", function(err, res) {
      
        if (err) throw err;

        var aItems = JSON.stringify(res, null, 2)
        console.log("Products in Store: " + aItems);
        managerView();
    });
    managerView();
};

function viewLowInventory() {
    connection.query("SELECT item_id AS 'Item ID', product_name AS 'Item Name', department_name AS 'Department', price AS 'Price($)', stock_quantity AS 'Quantity'  FROM itemList WHERE stock_quantity <= 5", function(err, res) {
      
        if (err) throw err;

        var aItems = JSON.stringify(res, null, 2)
        console.log("Products where Inventory is now less than 5: " + aItems);
        managerView();
    });
};

function addToInventory() {
    inquirer
    .prompt([
      {
          type: 'list',
          name: 'item',
          message: 'Please Select the ID of the Item that you wish to update the Inventory',
          choices: ['1', '2', '3','4','5', '6', '7', '8', '9', '10']
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many units would you like to add?',
          }
    ])
    .then(answers => {
        connection.query("SELECT stock_quantity AS 'quantity' FROM itemList WHERE item_id = " + parseInt(answers.item), function(err, res) {
            if (err) throw err;
            var quantity = parseInt(res[0].quantity);
            console.log(quantity)
            console.log(answers.quantity)
            quantity = quantity + parseInt(answers.quantity);


            connection.query("UPDATE itemList SET stock_quantity = " + quantity + " WHERE item_id = " + parseInt(answers.item), function(err, res) {
                if (err) throw err;
                console.log("Thank you, the changes have been made to the inventory");
                managerView();
            });
        });
        
    });
    
}