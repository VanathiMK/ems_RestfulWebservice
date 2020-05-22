
const dynamoose = require("dynamoose");

const db = {};
db.dynamoose = dynamoose;
db.url = "http://localhost:8000";
db.EmployeeModel = require("./Employee.model.js")(dynamoose);

module.exports = db;