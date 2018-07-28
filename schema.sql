DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,4) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Water TV Stick", "Electronics", 39.99, 250);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Echo Square", "Electronics", 49.99, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Bamazon Essentials Men's Regular-Fit Quick-Dry Golf Polo Shirt", "Clothing, Shoes & Jewelry", 15.00, 300);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Womens and Mens Water Shoes Barefoot Quick-Dry Aqua Socks for Beach Swim Surf Yoga Exercise", "Clothing, Shoes & Jewelry", 13.88, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Champion Men's Long Mesh Short with Pockets", "Clothing, Shoes & Jewelry", 74.21, 85);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Cards Against Humanity", "Toys & Games", 25.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Jenga Classic Game", "Toys & Games", 10.26, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Aurosports 10x25 Folding High Powered Binoculars ", "Camera & Photo", 27.50, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("2 Pcs Duracell CR1632 1632 Car Remote Batteries", "Camera & Photo", 5.37, 500);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life", "Books", 14.28, 200);