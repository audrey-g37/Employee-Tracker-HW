DROP DATABASE IF EXISTS store_db;
CREATE DATABASE store_db;
USE store_db;

CREATE TABLE employeeDepartment (
    id INT PRIMARY KEY AUTO_INCRAMENT NOT NULL,
    name VARCHAR(30) AUTO_INCRAMENT NOT NULL,

);

CREATE TABLE employeeRole (
    id INT PRIMARY KEY AUTO_INCRAMENT NOT NULL,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCRAMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES employeeRole(id)
);