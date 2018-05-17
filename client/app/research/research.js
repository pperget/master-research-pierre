(function() {
  'use strict';

  angular
    .module('app.research')
    .controller('Research', Research);

  function Research($scope, DAO) {
    var vm = this;

    vm.contentState = 'all';
    vm.research = '';
    vm.category = 'Écoles';

    vm.changeCategory = function() {
      if (vm.category === 'Formations') {
        vm.category = 'Écoles';
      } else {
        vm.category = 'Formations';
      }
    };

    vm.reset = function() {
      vm.research = '';
    };

    vm.school = {};
    vm.showSchool = function(schoolId) {
      // Change content view state
      vm.contentState = 'one';
      // Find the school
      vm.school = vm.schools.find(school => school._id === schoolId);
      // Find the courses
      vm.course = vm.courses.filter(course => course.school.includes(schoolId));
      // Map animation
      vm.map.flyTo(vm.school.location.coordinates, 12, {duration: 3});
    };

    vm.course = [];
    vm.courseFormerStudent = [];
    vm.showCourse = function(courseId) {
      // Change content view state
      vm.contentState = 'one';
      // Find the course
      vm.course = [vm.courses.find(course => course._id === courseId)];
      // Find the school
      vm.school = vm.schools.find(school => school._id === vm.course[0].school);
      // Rajout Pierre
      // Find student by school
      vm.test(courseId);
      vm.courseFormerStudent = vm.courseFormerStudents;
      // Map animation
      vm.map.flyTo(vm.school.location.coordinates, 12, {duration: 3});
    };

    // Map base settings
    vm.map = L.map('mapid');
    vm.map.setView([46.61, 2.72], 6);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      // minZoom: 6,
      // maxZoom: 18,
  		id: 'mapbox.streets',
  		accessToken: 'pk.eyJ1IjoicHBlcmdldCIsImEiOiJjamZibjlibzcyNXgyMnhucjFxemc5YWQxIn0.ZTNERHrUn5YkoD6sUEJx_Q'
  	}).addTo(vm.map);

    // Get schools
    vm.schools = [];
    DAO.getSchools().then(function(response) {
      vm.schools = response.data;

      // Map markers
      var schoolIcon = L.icon({
        iconUrl: 'assets/img/master-icon.png',
        shadowUrl: 'assets/img/master-icon.png',
        iconSize: [32, 48],
        shadowSize: [32, 48],
        iconAnchor: [16, 32],
        shadowAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      // Map clusters
      var markers = L.markerClusterGroup({
        maxClusterRadius: 30
      });

      // Set markers coordinates, icon, bind popup and click event
      for (var i = 0; i < vm.schools.length; i++) {
        markers
          .addLayer(
            L.marker(vm.schools[i].location.coordinates, {icon: schoolIcon})
              .bindPopup(vm.schools[i].name)
              .on('click', function(e) {
                // Retrieve marker coordinates
                var markerCoordinates = e.target.getLatLng();
                // Find the school id by coordinates
                var schoolId = vm.schools.find(school => school.location.coordinates[0] === markerCoordinates.lat && school.location.coordinates[1] === markerCoordinates.lng)._id;
                // Show the school
                vm.showSchool(schoolId);
                // Tell the scope to watch for changes now, otherwise it won't be aware of changes
                $scope.$digest();
              })
          );
      }
      // Add the markers to the map
      vm.map.addLayer(markers);
    }, function(response) {
      console.log('Error during getSchools');
    });

    // Get courses
    vm.courses = [];
    DAO.getCourses().then(function(response) {
      vm.courses = response.data;
    }, function(response) {
      console.log('Error during getCourses');
    });

    // Get former students
    vm.formerStudents = [];
    DAO.getFormerStudents().then(function(response) {
      vm.formerStudents = response.data;
    }, function(response) {
      console.log('Error during getformerStudents');
    });

    // Rajout Pierre
    // Get course former students
    vm.courseFormerStudents = [];
    vm.test = function(courseId) {
      DAO.getCourseFormerStudents(courseId).then(function(response) {
        vm.courseFormerStudents = response.data;
      }, function(response) {
        console.log('Error during getCourseFormerStudents');
      });
    }

  }

})();
