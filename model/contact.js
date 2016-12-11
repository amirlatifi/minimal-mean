var mongoose = require('mongoose');


// statements.  They enforce useful constraints on the data.
var contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
mongoose.model('Contact', contactSchema);