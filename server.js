const express = require("express");
const cors = require("cors");

const app = express();

// if use  following corsOption, there will be warning angular warning
// Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource
// remove option in order to make it work.
// https://www.stackhawk.com/blog/angular-cors-guide-examples-and-how-to-enable-it/
/*
var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
*/

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/favicon.ico', express.static('./favicon.ico'));

const db = require("./app/models");
const bodyParser = require("express");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
app.use(bodyParser.urlencoded({
    extended: true
}));


require("./app/routes/tutorial.routes")(app);
require("./app/routes/employee.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});