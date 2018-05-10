(function() {
  'use strict';

  angular
    .module('app')
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/home/home.html',
          // controller: ''
        })
        .when('/research', {
          templateUrl: 'app/research/research.html',
          controller: 'ResearchCtrl',
          controllerAs: 'research'
        })
        .when('/addSchool', {
          templateUrl: 'app/form/addSchool.html',
          controller: 'AddSchoolCtrl',
          controllerAs: 'addSchool'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider
        .hashPrefix('!');
        // .html5Mode(true);
    });

})();
