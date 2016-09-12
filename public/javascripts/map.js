angular.module('myApp')
.component('map', {
  template: `
  <div ng-controller="MapController">
    <div id="map"></div>
    <div id="repeat" ng-repeat="marker in markers | orderBy : 'title'">
         <a id="party_container" href="#" ng-click="openInfoWindow($event, marker)">
         <label id="names" >{{marker.title}}</label></a>
    </div>
  </div>
  `,
  controller: function ($scope) {

    var parties = [
            {
                place : 'Ford Factory',
                desc : 'Party at my place!',
                address: '699 Ponce de Leone Ave',
                lat : 33.7729,
                long : -84.3642
            },
            {
                place : 'Sweetwater',
                desc : 'Mmmmm Beer!',
                address: '195 Ottley Dr NE',
                lat : 33.8081,
                long : -84.3831
            },
            {
                place : 'Fox Theater',
                desc : 'Party at the Fox!',
                address: '660 Peachtree St NE',
                lat : 33.7726,
                long : -84.3856
            }
        ];

        var map;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
          });
        }

      $scope.markers = [];

      var infoWindow = new google.maps.InfoWindow();

      //function to open window when party link is clicked
      $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }

      var createMarker = function (info){

          var marker = new google.maps.Marker({
              map: $scope.map,
              position: new google.maps.LatLng(info.lat, info.long),
              title: info.place
          });
          marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + '<br />' + info.lat + ' E,' + info.long +  ' N, </div>';

          google.maps.event.addListener(marker, 'click', function(){
              infoWindow.setContent('<h4>' + marker.title + '</h4>' +
              marker.content);
              infoWindow.open($scope.map, marker);
          });

          $scope.markers.push(marker);

      }

      for (i = 0; i < parties.length; i++){
          createMarker(parties[i]);
      }

  }
  });
