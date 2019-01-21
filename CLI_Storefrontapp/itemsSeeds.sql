DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE itemList (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(250) NULL,
  price INTEGER(10) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO itemList (product_name, department_name, price, stock_quantity)
VALUES ("Xbox", "Electronics", 299, 10);

INSERT INTO itemList (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo", "Electronics", 299, 4);

INSERT INTO itemList (product_name, department_name, price, stock_quantity)
VALUES ("Soccer Ball", "Sports", 8, 25);

INSERT INTO itemList (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sports", 10, 5);

INSERT INTO itemList (product_name, department_name, price, stock_quantity)
VALUES ("iPod", "Electronics", 400, 8);

INSERT INTO itemList (Item, Department, Price, Quantity)
VALUES ("Watch", "Jewelry", 199, 8);

INSERT INTO itemList (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 600, 12);

INSERT INTO itemList (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping Bag", "Outdoors", 35, 20);

INSERT INTO itemList (product_name, department_name, price, stock_quantity)
VALUES ("Flashlight", "Outdoors", 15, 55);

INSERT INTO itemList (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sports", 10, 5);



