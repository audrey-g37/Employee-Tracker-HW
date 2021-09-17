const inquirer = require("inquirer");
const fs = require("fs");
const index = require("../index");
const positions = require("../db/dcsd_ms_positions.json");
const employees = require("../db/dcsd_ms_employees.json");
const { up } = require("inquirer/lib/utils/readline");

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
          employeeInput.firstName.toUpperCase() &&
        employees[i].lastName.toUpperCase() ===
          employeeInput.lastName.toUpperCase()
      ) {
        return console.log(
          `An employee named ${employeeInput.firstName} ${employeeInput.lastName} already exists.  To update the posistion this employee holds, please restart the program and choose the option to update an employee's position.`
        );
      }
    }

    let employeePositionInfo = [];

    for (i = 0; i < positions.length; i++) {
      if (employeeInput.employeePosition === positions[i].positionName) {
        employeePositionInfo.push(positions[i]);
      }
    }

    employeeInput.positionCategory = employeePositionInfo[0].positionCategory;
    employeeInput.positionSalary = employeePositionInfo[0].positionSalary;

    allEmployees = employees;
    allEmployees.push(employeeInput);
    fs.writeFile(
      "./db/dcsd_ms_employees.json",
      JSON.stringify(allEmployees),
      (err) => {
        if (err) throw err;
      }
    );
    index.userChoices();
  });
};

const updatePosition = function () {
  let employeeNames = [];
  if (employees.length === 0) {
    return console.log("No employees have been added yet.");
  }
  for (i = 0; i < employees.length; i++) {
    employeeNames.push(`${employees[i].firstName} ${employees[i].lastName}`);
  }
  const newQuestions = [
    {
      type: "list",
      message: "Which employee had a change of position?",
      name: "employeeName",
      choices: employeeNames,
    },
    {
      type: "list",
      message: "What position will this employee now hold?",
      name: "employeePosition",
      choices: listPositions,
    },
  ];
  inquirer.prompt(newQuestions).then((choice) => {
    let employeeNewPositionInfo = [];
    let updateIndex;

    for (i = 0; i < positions.length; i++) {
      if (choice.employeePosition === positions[i].positionName) {
        employeeNewPositionInfo.push(positions[i]);
      }
      if (choice.employeeName === employeeNames[i]) {
        updateIndex = i;
      }
    }
    employees[updateIndex].employeePosition = choice.employeePosition;
    employees[updateIndex].positionSalary =
      employeeNewPositionInfo[0].positionSalary;
    employees[updateIndex].positionCategory =
      employeeNewPositionInfo[0].positionCategory;

    fs.writeFile(
      "./db/dcsd_ms_employees.json",
      JSON.stringify(employees),
      (err) => {
        if (err) throw err;
      }
    );
    index.userChoices();
  });
};

const viewEmployees = function () {
  console.table(employees);
  index.userChoices();
};

module.exports = { addEmployee, viewEmployees, updatePosition };
