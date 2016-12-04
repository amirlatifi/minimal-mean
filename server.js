var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require('mongoose');
var ObjectID = mongodb.ObjectID;

var uristring = process.env.MONGODB_URI || 'mongodb://localhost/HelloMongoose';

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

mongoose.connect(uristring, function (err, database) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
        process.exit(1);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.
var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
var User = mongoose.model('AllUsers', userSchema);

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/contacts", function (req, res) {
    User.find({}).exec(function (err, docs) {
        if (err) {
            // error handling
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/contacts", function (req, res) {
    var body = req.body;
    var newContact = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone
    });

    if (!(req.body.firstName || req.body.lastName)) {
        handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
    }

    newContact.save(function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new contact.");
        } else {
            res.status(201).json(newContact);
        }
    });
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/contacts/:id", function (req, res) {
    User.findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/contacts/:id", function (req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    var query = {'_id': req.params.id};

    User.findOneAndUpdate(query, updateDoc, function (err) {
        if (err) {
            handleError(res, err.message, "Failed to update contact");
        } else {
            res.status(204).end();
        }
    });
});

app.delete("/contacts/:id", function (req, res) {
    User.remove({_id: req.params.id}, function (err) {
        if (!err) {
            res.status(204).end();
        }
        else {
            handleError(res, err.message, "Failed to delete contact");
        }
    });
});
