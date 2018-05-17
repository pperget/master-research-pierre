(function() {
  'use strict';

  angular
    .module('app.contribute')
    .controller('PostCourse', PostCourse);

  function PostCourse(DAO) {
    var vm = this;

    vm.title = 'Ajouter une formation';

    vm.conf = {
      name: {
        id: "courseNameId",
        name: "courseNameName",
        type: "text",
        placeholder: "Nom",
        kind: "input",
        maxlength: 128,
        required: true
      },
      acronym: {
        id: "courseAcronymId",
        name: "courseAcronymName",
        type: "text",
        placeholder: "Acronyme",
        kind: "input",
        maxlength: 32,
        required: true
      },
      url: {
        id: "courseUrlId",
        name: "courseUrlName",
        type: "text",
        placeholder: "Adresse web",
        kind: "input",
        maxlength: 256,
        required: true
      },
      type: {
        id: "courseTypeId",
        name: "courseTypeName",
        type: "text",
        placeholder: "Type",
        kind: "input",
        maxlength: 32,
        required: true
      },
      school: {
        id: "courseSchoolId",
        name: "courseSchoolName",
        type: "text",
        placeholder: "École",
        kind: "select",
        required: true,
        options: [
          "Auvergne-Rhône-Alpes",
          "Bourgogne-Franche-Comté",
          "Bretagne",
          "Centre-Val de Loire",
          "Corse",
          "Grand Est",
          "Hauts-de-France",
          "Île-de-France",
          "Normandie",
          "Nouvelle-Aquitaine",
          "Occitanie",
          "Pays de la Loire",
          "Provence-Alpes-Côte d'Azur",
          "Guadeloupe",
          "Guyane (française)",
          "Martinique",
          "La Réunion",
          "Mayotte"
        ]
      }
    };

    vm.default = {
      name: "",
      acronym: "",
      url: "",
      type: "",
      school: ""
    };

    vm.temp = angular.copy(vm.default);
    vm.alert = '';
    vm.message = 'Merci par avance de la part de jeunes étudiants en quête d\'informations.';

    vm.reset = function(form) {
      vm.temp = angular.copy(vm.default);
      vm.alert = '';
      vm.message = 'Le formulaire a bien été réinitialisé.';
      form.$setPristine();
    };

    vm.submit = function(isValid) {
      if (isValid) {
        DAO.getCoordinates(vm.temp.name, vm.temp.city).then(function(response) {
          if (response.data.status == 'OK') {
            vm.temp.location.coordinates = [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng];
            console.log('Success during getCoordinates with status : '+response.status);
            DAO.postSchool(vm.temp).then(function(response) {
              vm.alert = 'success';
              vm.message = 'Votre ajout à bien été pris en compte, souhaitez-vous continuer ?';
              console.log('Success during postSchool with status : '+response.status);
            }, function(response) {
              vm.alert = 'error';
              vm.message = 'Notre base de données est très certainement en maintenance, merci de réessayer plus tard.';
              console.log('Error during postSchool with status : '+response.status);
            });
          } else {
            vm.alert = 'error';
            vm.message = 'Les informations fournies ne nous ont pas permis de localiser cette école.';
            console.log('Error during getCoordinates with status : '+response.data.status);
          }
        }, function(response) {
          vm.alert = 'error';
          vm.message = 'Notre service de localisation est probablement en panne.';
          console.log('Error during getCoordinates with status : '+response.status);
        });
      } else {
        vm.alert = 'warning';
        vm.message = 'Le formulaire est invalide.'
        console.log('Form invalid');
      }
    };
  }

})();
