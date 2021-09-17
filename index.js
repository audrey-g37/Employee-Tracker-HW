const inquirer = require("inquirer");
const { addCategory, viewCategories } = require("./helpers/categories");
const { addPosition, viewPositions } = require("./helpers/positions");
const {
  addEmployee,
  viewEmployees,
  updatePosition,
} = require("./helpers/employees");

// let continueOn = true;

const userChoices = () => {
  const userMessage = {
    type: "list",
    message: "What would you like to do?",
    name: "toDo",
    choices: [
      "View all categories",
      "View all positions",
      "View all employees",
      "Add a category",
      "Add a position",
      "Add an employee",
      "Update an employee's position",
      "Quit",
    ],
  };
  inquirer
    .prompt(userMessage)
    .then((choice) => {
      switch (choice.toDo) {
        case "View all categories":
          viewCategories();
          break;
        case "View all positions":
          viewPositions();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a category":
          addCategory();
          break;
        case "Add a position":
          addPosition();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee's position":
          updatePosition();
          break;
        case "Quit":
          console.log("Quit selected. Goodbye!");
          // continueOn = false;
          break;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

userChoices();

exports.userChoices = userChoices;
