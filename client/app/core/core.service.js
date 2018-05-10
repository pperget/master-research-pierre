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
      getFormerStudent: getFormerStudent
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
  }

})();
