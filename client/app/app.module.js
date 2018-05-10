(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'ngAnimate',
      'angular-leaflet',
      'app.core',
      'app.layout',
      'app.home',
      'app.research',
      'app.form'
    ]);

})();
