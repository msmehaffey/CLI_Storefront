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
    connection.query("SELECT item_id AS 'Item ID', product_name AS 'Item Name', department_name AS 'Department', price AS 'Price($)', stock_quantity AS 'Quantity'  FROM itemList WHERE stock_quantity < 5", function(err, res) {
      
        if (err) throw err;

        var aItems = JSON.stringify(res, null, 2)
        console.log("Products where Inventory is now less than 5: " + aItems);
        managerView();
    });
};

function addToInventory() {
    delete quantity;
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
            message: 'How many units would you like to add?'
          }
    ])
    .then(answers => {
            connection.query("UPDATE itemList SET stock_quantity = stock_quantity + " + parseInt(answers.quantity) + " WHERE item_id = " + parseInt(answers.item), function(err, res) {
                if (err) throw err;
                console.log("Thank you, the changes have been made to the inventory");
                managerView();
            }); 
    });  
};

function addNewProduct() {
    inquirer
  .prompt([
    {
        type: 'input',
        name: 'itemName',
        message: 'Please enter the name of the product you would like to add to the store.',
      },
      {
        type: 'list',
        name: 'itemDepartment',
        message: 'Please select the department of the item.',
        choices: ['Electronics', 'Sports', 'Outdoors']
      },
      {
        type: 'input',
        name: 'itemPrice',
        message: 'Please enter the price of the product'
      },
      {
        type: 'input',
        name: 'itemQuantity',
        message: 'Please enter the starting quantity of the product'
      }
  ])
  .then(answers => {
    connection.query("INSERT INTO itemList(product_name, department_name, price, stock_quantity) VALUES (" + JSON.stringify(answers.itemName) + ", " + JSON.stringify(answers.itemDepartment) + ", " + parseInt(answers.itemPrice) + ", " + parseInt(answers.itemQuantity) + ")", function(err, res) {
      
        if (err) throw err;
        else {
        console.log("Inventory succesfully updated!");
        managerView();
        }
    });
    })
};
