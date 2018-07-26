DROP DATABASE bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT ,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Trek Madone 9.9", "Sporting Goods", "11999.99", 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fishing Rod", "Sporting Goods", "29.99", 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AmazonBasics USB 3.0 Universal Laptop Docking Station
", "Electronics", "89.00", 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beats Solo3 Wireless On-Ear Headphones", "Electronics", "199.99", 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Da Vinci Code", "Books", "12.99", 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro 13 in Retina Display", "Electronics", "1999.99", 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ray Ban Aviator Sunglasses", "Apparel", "99.99", 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Fire Stick", "Electronics", "29.99", 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Echo", "Electronics", "39.99",  33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("55in Vizio LCD TV", "Electronics", "799.99",  20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter", "Books", "12.99", 20);

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL UNIQUE,
    over_head_costs INT(10) NOT NULL,
    PRIMARY KEY(department_id)
);


INSERT INTO departments (department_name, over_head_costs)
VALUES ("Sporting Goods", 10000 );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 15000 );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 11000 );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Apparel", 5000 );

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Other",  5000 );

ALTER TABLE products
ADD product_sales INT(10) 
