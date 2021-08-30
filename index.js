const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   root: 3306,
//   password: "password",
//   database: "store_db",
// });

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
