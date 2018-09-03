create database bamazon;

use bamazon;

create table products (
    item_id int primary key auto_increment,
    product_name varchar(50) not null,
    department_name varchar(255),
    price float not null,
    stock_quantity int default 0
);

insert into products (product_name, department_name, price, stock_quantity) values
("Oven", "Appliances", 1899.75, 10), 
("Microwave", "Appliances", 255.50, 10), 
("Hammer", "Tools", 10.50, 10), 
("Shovel", "Tools", 16.99, 10), 
("Cell Phone", "Electronics", 599.99, 10), 
("Headphones", "Electronics", 75.00, 10), 
("Eye Shadow Kit", "Make-Up", 85.99, 10), 
("Lipstick", "Make-Up", 3000.00, 10), 
("Shirt", "Clothing", 20.00, 10), 
("Pants", "Clothing", 30.00, 10) 