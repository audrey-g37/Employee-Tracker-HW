const inquirer = require("inquirer");
const fs = require("fs");
const userChoices = require("../index.js");
const categories = require("../db/dcsd_ms_categories.json");

const listCategories = function () {
  if (categories.length === 0) {
    return { message: "No categories have been added. Add a category first." };
  }
  console.log(categories);
};

let positionOptions = [];

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
    choices: listCategories(),
  },
];

const addPosition = function () {
  inquirer.prompt(positionQuestions).then((data) => {
    fs.appendFile(
      "../db/dcsd_ms_positions.json",
      JSON.stringify(data),
      (err) => {
        if (err) throw err;
        console.log(
          `${data.positionName} has been added to the position options.`
        );
      }
    );
  });
};

const viewPositions = function () {
  console.log("clicked view Positions");
};

const updatePosition = function () {};

module.exports = {
  viewPositions,
  addPosition,
  updatePosition,
};
