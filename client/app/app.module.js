(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'ui.bootstrap',
      'app.core',
      'app.widgets',
      'app.home',
      'app.research',
      'app.stats',
      'app.contribute'
    ]);

})();
