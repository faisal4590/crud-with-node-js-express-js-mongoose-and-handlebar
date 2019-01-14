const express = require("express");

var router = express.Router();

const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee"
  });
  ///addOrDelete.hbs file ta render korci jokhon home directory te jabo
  //addOrDelete.hbs file e h3 tag e 1ta property dicilam viewTitle, oitar value ta ekhan theke pass korlam
});

router.post("/", (req, res) => {
  //req.body te form er shob data eshe store hobe submit button e click korar por

  if (req.body._id == "") {
    //jodi url e kono id provide na kori, tar mane insert korbo
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) {
      res.redirect("employee/list");
      //data successfully insert hole employee der list ta dekhabo user ke
    } else {
      //console.log("Error occurred inserting form data into mongoose " + err);

      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        //error thakle form ta abar render korbo
        res.render("employee/addOrEdit", {
          viewTitle: "Insert Employee",
          employee: req.body
        });
      } else {
        console.log("Error occurred inserting form data into mongoose " + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("employee/addOrEdit", {
            viewTitle: "Update Employee",
            employee: req.body
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs
      });
    } else {
      console.log("Error during retrieving employee data " + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message; ///employeeModel.js file e je fullname e required field e error message likhcilam ota pailam
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

//route for updating a course with a specific id
router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    //url e je id ta ashbe ota get korlam req.params.id diye
    if (!err) {
      res.render("employee/addOrEdit", {
        viewTitle: "Update Employee",
        employee: doc
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/employee/list");
    } else {
      console.log("Error in employee delete :" + err);
    }
  });
});

module.exports = router;
