var Resource = require('resourcejs');

module.exports = function(app, route) {

  // Setup the controller for REST.
  Resource(app, '', route, app.models.course).rest();
  Resource(app, '/school/:schoolId', route, app.models.course).rest({

    // Add a before handler to include filter and parent information.
    before: function(req, res, next) {
      req.body.school = req.params.schoolId;
      req.modelQuery = this.model.where('school', req.params.schoolId);
      next();
    }
  });

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};
