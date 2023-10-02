module.exports = app => {
    const employee = require("../controllers/employee.controller.js");

    var router = require("express").Router();

    // Create a new Employee
    router.post("/", employee.create);

    // create employees
    router.post("/list", employee.createList);

    // Retrieve all Tutorials
    router.get("/", employee.findAll);

    // Retrieve all published Tutorials
    router.get("/published", employee.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", employee.findOne);

    // Update a Employee with id
    router.put("/:id", employee.update);

    // Delete a Employee with id
    router.delete("/:id", employee.delete);

    // Create a new Employee
    router.delete("/", employee.deleteAll);

    app.use("/api/employees", router);
};