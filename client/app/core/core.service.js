(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('DAO', dataAccessObject)

  function dataAccessObject($http) {

    var service = {
      getSchools: getSchools,
      getSchool: getSchool,
      getSchoolCourses: getSchoolCourses,
      getCourses: getCourses,
      getCourse: getCourse,
      getCourseFormerStudents: getCourseFormerStudents,
      getFormerStudents: getFormerStudents,
      getFormerStudent: getFormerStudent,
      getCoordinates: getCoordinates,
      postSchool: postSchool,
      postCourse: postCourse,
      postFormerStudent: postFormerStudent
    };

    return service;

    function getSchools() {
      return $http.get('http://localhost:3000/school?limit=999999');
    }

    function getSchool(schoolId) {
      return $http.get('http://localhost:3000/school/'+schoolId);
    }

    function getSchoolCourses(schoolId) {
      return $http.get('http://localhost:3000/school/'+schoolId+'/course?limit=999999');
    }

    function getCourses() {
      return $http.get('http://localhost:3000/course?limit=999999');
    }

    function getCourse(courseId) {
      return $http.get('http://localhost:3000/course/'+courseId);
    }

    function getCourseFormerStudents(courseId) {
      return $http.get('http://localhost:3000/course/'+courseId+'/formerStudent?limit=999999');
    }

    function getFormerStudents() {
      return $http.get('http://localhost:3000/formerStudent?limit=999999');
    }

    function getFormerStudent(formerStudentId) {
      return $http.get('http://localhost:3000/formerStudent/'+formerStudentId);
    }

    function getCoordinates(name, city) {
      var address = 'https://maps.googleapis.com/maps/api/geocode/json?address='+name+city+'&key=AIzaSyCqvUga640ZS4oGHgjk-bsrjjwMd-BzYnw';
      return $http.get(address.replace(/ /g, '+'));
    }

    function postSchool(school) {
      return $http.post('http://localhost:3000/school', school);
    }

    function postCourse(course) {
      return $http.post('http://localhost:3000/course', course);
    }

    function postFormerStudent(formerStudent) {
      return $http.post('http://localhost:3000/formerStudent', formerStudent);
    }
  }

})();
