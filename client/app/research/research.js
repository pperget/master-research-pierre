(function() {
  'use strict';

  angular
    .module('app.research')
    .controller('ResearchCtrl', ResearchCtrl);

  function ResearchCtrl(DAO) {
    var research = this;

    DAO.getCourses().then(function(response) {
      research.courses = response.data;
    }, function(response) {
    });

    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
      modal.style.display = "none";
      angular.element(document.getElementById('masterModal')).html('');
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        angular.element(document.getElementById('masterModal')).html('');
      }
    }

    /*début fonction modale*/
    research.onClick = function(e) {
      var school;
      var nbMastersBySchool = 0;
      modal.style.display = "block";
      for (var i=0; i<research.schools.length; i++){
        if (research.schools[i].location.coordinates[0] == e.latlng.lat || research.schools[i].location.coordinates[1] == e.latlng.lat){
          school = research.schools[i]._id;
          angular.element(document.getElementById('school')).html('<p id="school">'+research.schools[i].name+'</p>');
        }
      }
      for (var i=0; i<research.courses.length; i++){
        if (research.courses[i].school == school){
          nbMastersBySchool +=1;
          angular.element(document.getElementById('masterModal')).append('<li id="master" ng-click="research.select(e)">'+research.courses[i].name+'</li>');
        }
      }
      angular.element(document.getElementById('nbMasterBySchool')).html(nbMastersBySchool);
    }
    /*fin fonction modale*/

    research.onMapInitialized = function(map) {
      research.leaflet = map;
      research.leaflet.setView([46.61,2.72]);
      research.leaflet.setZoom(6);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    		maxZoom: 18,
    		id: 'mapbox.streets',
    		accessToken: 'pk.eyJ1IjoicHBlcmdldCIsImEiOiJjamZibjlibzcyNXgyMnhucjFxemc5YWQxIn0.ZTNERHrUn5YkoD6sUEJx_Q'
    	}).addTo(research.leaflet);

      var masterIcon = L.icon({
        iconUrl: 'assets/img/master-icon.png',
        shadowUrl: 'assets/img/master-icon.png',

        iconSize:     [32, 48], // size of the icon
        shadowSize:   [32, 48], // size of the shadow
        iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
        shadowAnchor: [16, 32],  // the same for the shadow
        popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
      });

      DAO.getSchools().then(function(response){
        research.schools = response.data
        var list = research.schools;
        var markers = L.markerClusterGroup({
          maxClusterRadius: 30,
        });
        for(var i = 0;i<list.length;i++){
            markers
            .addLayer(
              L.marker(list[i].location.coordinates, {icon: masterIcon})
              .on('click', research.onClick)
            );
            research.leaflet.addLayer(markers);
            //console.log(list[i], list[i].location.coordinates);
        }
      });
    };

    research.select = function(e){
      research.master = e;
      research.flag = true;
    }

    research.back = function(){
      research.flag = false;
    }
  }
})();
