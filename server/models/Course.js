var mongoose = require('mongoose');

// Create the schema.
var courseSchema = new mongoose.Schema({
  name: {
    type: String
  },
  acronym: {
    type: String
  },
  type: {
    type: String
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    index: true
  }
});

// Export the model.
module.exports = mongoose.model('Course', courseSchema);
