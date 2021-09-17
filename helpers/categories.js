const inquirer = require("inquirer");
const fs = require("fs");
const index = require("../index");
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
      if (
        categories[i].categoryName.toUpperCase() ===
        categoryInput.categoryName.toUpperCase()
      ) {
        return console.log("This category already exists");
      }
    }
    categoryOptions = categories;
    categoryOptions.push(categoryInput);
    fs.writeFile(
      "./db/dcsd_ms_categories.json",
      JSON.stringify(categoryOptions),
      (err) => {
        if (err) throw err;
      }
    );
    index.userChoices();
  });
};

const viewCategories = function () {
  console.table(categories);
  index.userChoices();
};

module.exports = { addCategory, viewCategories };
