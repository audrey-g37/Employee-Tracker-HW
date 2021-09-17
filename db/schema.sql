DROP DATABASE IF EXISTS DCSD_MS_db;
CREATE DATABASE DCSD_MS_db;
USE DCSD_MS_db;

CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(30) NOT NULL

);

CREATE TABLE position (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR (30),
    salary DECIMAL,
    category_id INT,
    FOREIGN KEY (category_id)
    REFERENCES category(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    position_id INT,
    evaluator_id INT,
    FOREIGN KEY (position_id)
    REFERENCES position (id)
);