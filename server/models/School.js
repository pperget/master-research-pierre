var mongoose = require('mongoose');

// Create the schema.
var schoolSchema = new mongoose.Schema({
  name: {
    type: String
  },
  acronym: {
    type: String
  },
  postalCode: {
    type: String
  },
  city: {
    type: String
  },
  region: {
    type: String
  },
  country: {
    type: String
  },
  location: {
    type: {
      type: String
    },
    coordinates: []
  }
});

schoolSchema.index({location: '2dsphere'});

// Export the model.
module.exports = mongoose.model('School', schoolSchema);
