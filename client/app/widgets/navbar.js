(function() {
  'use strict';

  angular
    .module('app.widgets')
    .controller('Navbar', Navbar);

  function Navbar($location, $rootScope) {
    var navbar = this;

    navbar.isActive = function (viewLocation) {
      $rootScope.currentLocation = $location.path();
      return viewLocation === $location.path();
    };
  }

})();
