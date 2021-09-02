const inquirer = require("inquirer");
const fs = require("fs");
const userChoices = require("../index.js");
const categories = require("../db/dcsd_ms_categories.json");

let categoryOptions;

const addCategory = function () {
  const categoryQuestions = {
    type: "input",
    message: "What is the name of the category?",
    name: "categoryName",
  };
  inquirer.prompt(categoryQuestions).then((categoryInput) => {
    for (i = 0; i < categories.length; i++) {
      if (categories[i] === categoryInput.categoryName.toUpperCase()) {
        return console.log("This category already exists");
      }
    }
    categoryOptions = categories;
    categoryOptions.push(categoryInput.categoryName.toUpperCase());
    fs.writeFile(
      "./db/dcsd_ms_categories.json",
      JSON.stringify(categoryOptions),
      (err) => {
        if (err) throw err;
        console.log(
          `${categoryInput.categoryName} has been added to the category options.`
        );
      }
    );
  });
};

const viewCategories = function () {
  console.log("clicked view Categories");
  console.table(categories);
};

module.exports = { addCategory, viewCategories };
