const inquirer = require("inquirer");
const { addCategory, viewCategories } = require("./helpers/categories");
const {
  addPosition,
  viewPositions,
  updatePosition,
} = require("./helpers/positions");
const { addEmployee, viewEmployees } = require("./helpers/employees");

// let continueOn;

function userChoices() {
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
      "Update characteristics of an employee position",
      "Quit",
    ],
  };
  inquirer.prompt(userMessage).then((choice) => {
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
      case "Update characteristics of an employee position":
        updatePosition();
        break;
      case "Quit":
        console.log("Quit selected. Goodbye!");
        break;
    }
  });
}

userChoices();

// if (continueOn === true) {
//   userChoices();
// }

module.exports = userChoices;
