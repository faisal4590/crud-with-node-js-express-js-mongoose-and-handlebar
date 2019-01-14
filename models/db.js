const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/EmployeeDB",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("MongoDB connection successful");
    } else {
      console.log("Error connecting with database" + err);
    }
  }
);

require("./employee.model"); //loading the schema
