const inquirer = require("inquirer");

const askUser = () =>
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "toDo",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ],
    })
    .then((choice) => {
      switch (choice) {
        case "view all departments":
          viewDepartments();
          askUser;
          break;
        case "view all roles":
          viewRoles();
          askUser;
          break;
        case "view all employees":
          viewEmployees();
          askUser;
          break;
        case "add a department":
          addDepartment();
          askUser;
          break;
        case "add a role":
          addRole();
          askUser;
          break;
        case "add an employee":
          addEmployee();
          askUser;
          break;
        case "update an employee role":
          updateRole();
          askUser;
          break;
      }
    });
