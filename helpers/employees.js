const inquirer = require("inquirer");
const fs = require("fs");
const userChoices = require("../index.js");
const positions = require("../db/dcsd_ms_positions.json");
const employees = require("../db/dcsd_ms_employees.json");

let positionNames = [];

const listPositions = function () {
  if (positions.length === 0) {
    return console.log("No positions have been added. Add a position first.");
  }
  positionNames = [];
  for (i = 0; i < positions.length; i++) {
    positionNames.push(positions[i].positionName);
  }
  return positionNames;
};

let allEmployees = [];

const addEmployee = function () {
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
      choices: listPositions,
    },
    {
      type: "input",
      message: "Who is the evaluator of this employee?",
      name: "evaluator",
    },
  ];
  inquirer.prompt(employeeQuestions).then((employeeInput) => {
    for (i = 0; i < employees.length; i++) {
      if (
        employees[i].firstName.toUpperCase() ===
          employeeInput.firstName.toUpperCase &&
        employees[i].lastName.toUpperCase() ===
          employeeInput.lastName.toUpperCase()
      ) {
        return console.log(
          "An employee with this first and last name already exists."
        );
      }
    }

    allEmployees = employees;
    allEmployees.push(employeeInput);
    fs.writeFile(
      "./db/dcsd_ms_employees.json",
      JSON.stringify(allEmployees),
      (err) => {
        if (err) throw err;
        console.log(
          `${employeeInput.firstName} has been added as an employee.`
        );
      }
    );
  });
};

const viewEmployees = function () {
  console.log("clicked view Employees");
  console.table(employees);
};

module.exports = { addEmployee, viewEmployees };
