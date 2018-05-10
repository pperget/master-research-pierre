(function() {
  'use strict';

  angular
    .module('app.form')
    .controller('AddSchoolCtrl', AddSchoolCtrl);

  function AddSchoolCtrl() {
    var addSchool = this;

    addSchool.default = {};

    addSchool.reset = function() {
      addSchool.school = angular.copy(addSchool.default);
    };

    addSchool.submit = function(isValid) {

    };

  }

})();
