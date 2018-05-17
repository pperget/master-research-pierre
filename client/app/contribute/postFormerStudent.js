(function() {
  'use strict';

  angular
    .module('app.contribute')
    .controller('PostFormerStudent', PostFormerStudent);

  function PostFormerStudent(DAO) {
    var vm = this;

    vm.title = 'Ajouter un étudiant';
  }

})();
