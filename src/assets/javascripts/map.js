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

        var mapOptions = {
                  zoom: 11,
                  center: new google.maps.LatLng(33.7490,-84.3880),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];

              var infoWindow = new google.maps.InfoWindow();

              var createMarker = function (info){

                  //Marker settings
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.place,
                      animation: google.maps.Animation.DROP
                  });
                  //Set info window content
                  marker.content = '<div class="infoWindowContent">' + info.desc + '<br />' + '<br />' + info.address + '<br />' + info.lat + ' E, ' + info.long +  ' N </div>';

                  //When marker clicked, display info window while zooming in on party location
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' +
                        marker.content);
                      infoWindow.open($scope.map, marker);
                      $scope.map.setZoom(15);
                      $scope.map.setCenter(marker.getPosition());
                  });

                  $scope.markers.push(marker);

              }

              for (i = 0; i < parties.length; i++){
                  createMarker(parties[i]);
              }

      //function to open window when party link is clicked
      $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }
  }
  });
