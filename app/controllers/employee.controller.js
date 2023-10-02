const db = require("../models");
const Employee = db.employee;

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    // Save employee in the database
    employee
        .save(employee)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};


// Create and Save new Employees
exports.createList = (req, res) => {

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            const employee = new Employee({
                firstName: req.body[key].firstName,
                lastName: req.body[key].lastName,
                email: req.body[key].email
            });
            employee
                .save(employee);
            console.log( `value for ${key} is ${employee}` )
        }
    }
    res.status(200).send({
        message:
            "It works."
    });
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
    const lastName = req.query.lastName;
    var condition = lastName ? { lastName: { $regex: new RegExp(lastName), $options: "i" } } : {};

    Employee.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Employees."
            });
        });
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Employee.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Employee with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Employee with id=" + id });
        });
};

// Update a Employee by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
                });
            } else res.send({ message: "Employee was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id=" + id
            });
        });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employee.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
                });
            } else {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id=" + id
            });
        });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
    Employee.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Employees were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Employees."
            });
        });
};

// Find all published Employees
exports.findAllPublished = (req, res) => {
    Employee.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Employees."
            });
        });
};