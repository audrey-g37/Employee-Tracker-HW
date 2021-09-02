const inquirer = require("inquirer");
const fs = require("fs");
const userChoices = require("../index.js");
const categories = require("../db/dcsd_ms_categories.json");
const positions = require("../db/dcsd_ms_positions.json");

let categoryNames;

const listCategories = function () {
  if (categories.length === 0) {
    return console.log("No categories have been added. Add a category first.");
  }
  categoryNames = [];
  for (i = 0; i < categories.length; i++) {
    categoryNames.push(categories[i].categoryName);
  }
  return categoryNames;
};

let positionOptions = [];

const addPosition = function () {
  const positionQuestions = [
    {
      type: "input",
      message: "What is the name of the position?",
      name: "positionName",
    },
    {
      type: "input",
      message: "What is the salary of the position?",
      name: "positionSalary",
    },
    {
      type: "list",
      message: "Under what category is this position?",
      name: "positionCategory",
      choices: listCategories,
    },
  ];
  inquirer.prompt(positionQuestions).then((positionInput) => {
    for (i = 0; i < positions.length; i++) {
      if (
        positions[i].positionName.toUpperCase() ===
        positionInput.positionName.toUpperCase()
      ) {
        return console.log("This position already exists");
      }
    }
    positionOptions = positions;
    positionOptions.push(positionInput);
    fs.writeFile(
      "./db/dcsd_ms_positions.json",
      JSON.stringify(positionOptions),
      (err) => {
        if (err) throw err;
        console.log(
          `${positionInput.positionName} has been added to the position options.`
        );
      }
    );
  });
};

const viewPositions = function () {
  console.log("clicked view Positions");
  console.table(positions);
};

const updatePosition = function () {};

module.exports = {
  viewPositions,
  addPosition,
  updatePosition,
};
