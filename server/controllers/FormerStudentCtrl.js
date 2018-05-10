var Resource = require('resourcejs');

module.exports = function(app, route) {

  // Setup the controller for REST.
  Resource(app, '', route, app.models.formerStudent).rest();
  Resource(app, '/course/:courseId', route, app.models.formerStudent).rest({

    // Add a before handler to include filter and parent information.
    before: function(req, res, next) {
      req.body.course = req.params.courseId;
      req.modelQuery = this.model.where('hasDone.course', req.params.courseId);
      next();
    }
  });

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};
