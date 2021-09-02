const inquirer = require("inquirer");
const fs = require("fs");
const userChoices = require("../index.js");
const positions = require("../db/dcsd_ms_positions.json");

const listPositions = function () {
  if (positions.length === 0) {
    return { message: "No positions have been added. Add a position first." };
  }
  positionOptions = [];
  for (i = 0; i < positions.length; i++) {
    return (positionOptions = positionOptions.append(
      JSON.stringify(positions)
    ));
  }
};

const employeeQuestions = [
  {
    type: "input",
    message: "What is the first name of the employee",
    name: "firstName",
  },
  {
    type: "input",
    message: "What is the last name of the employee?",
    name: "lastName",
  },
  {
    type: "list",
    message: "What position will this employee hold?",
    name: "employeePosition",
    choices: listPositions(),
  },
  {
    type: "input",
    message: "Who is the evaluator of this employee?",
    name: "evaluator",
  },
];

const addEmployee = function () {
  inquirer.prompt(employeeQuestions).then((data) => {
    fs.appendFile(
      "../db/dcsd_ms_employees.json",
      JSON.stringify(data),
      (err) => {
        if (err) throw err;
        console.log(`${data.firstName} has been added as an employee.`);
      }
    );
  });
};

const viewEmployees = function () {
  console.log("clicked view Employees");
};

module.exports = { addEmployee, viewEmployees };
