angular.module('myApp')
.component('partyEdit', {
template: `
    <div class="main-landing edit-landing">
    <h3>Edit</h3>

    <form ng-submit="$ctrl.save()">

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text"
               class="form-control"
               name="name"
               ng-model="$ctrl.party.name">
      </div>

      <div class="form-group">
        <label for="time.start">Start Time</label>
        <input type="text"
               class="form-control"
               name="startTime"
               ng-model="$ctrl.party.time.start">
      </div>

      <div class="form-group">
        <label for="time.start">End Time</label>
        <input type="text"
               class="form-control"
               name="endTime"
               ng-model="$ctrl.party.time.end">
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <md-datepicker ng-model="$ctrl.party.date"
                       md-placeholder="Enter date">
                       </md-datepicker>
      </div>

      <div id="geocoder">
        <input id="address" type="textbox" value="{{$ctrl.party.location.address}}">
        <input id="geocodeSubmit" type="button" value="Geocode">
      </div>

      <div id="geocodeMap"></div>

      <div class="form-group">
        <label for="description">Description</label>
        <input type="text"
               class="form-control"
               name="description"
               ng-model="$ctrl.party.description">
      </div>

      <div class="form-group">
        <input type="checkbox" id='foodList.chosen' class="form-control" name="foodList.chosen" ng-model="$ctrl.party.foodList.chosen"><label for="foodList.chosen">Food List</label>
      </div>

      <div class="form-group">
        <input type="checkbox" id='playlist.chosen' class="form-control" name="playlist.chosen" ng-model="$ctrl.party.playlist.chosen"><label for="playlist.chosen">Playlist</label>
      </div>

      <div class="form-group">
        <input type="checkbox" id='entertainment.chosen' class="form-control" name="entertainment.chosen" ng-model="$ctrl.party.entertainment.chosen"><label for="entertainment.chosen">Entertainment</label>
      </div>

      <a ui-sref="parties" class="btn yellow lighten-2 black-text">Back</a>
      <button type="submit" class="btn yellow lighten-2 black-text">Save</button>
    </form>
    </div>
  `,
  controller: function(partyService, $state, $stateParams) {
    var editPartyController = this;
    editPartyController.party = null;
    editPartyController.marker = undefined;
    // editPartyController.markers = [];

    editPartyController.show = function() {
      $state.go('party-show', { id: editPartyController.party._id });
    };

    editPartyController.save = function() {
      partyService.update(editPartyController.party)
      .then( res => {
        $state.go('parties');
      });
    };

    partyService.getParty($stateParams.id)
    .then( res => {
      editPartyController.party = res.data;
      editPartyController.party.date = new Date(editPartyController.party.date);

      editPartyController.initMap();
    });

    editPartyController.initMap = function() {
      var map = new google.maps.Map(document.getElementById('geocodeMap'), {
        zoom: 11,
        center: new google.maps.LatLng(editPartyController.party.location.lat, editPartyController.party.location.lng)
      });
      var geocoder = new google.maps.Geocoder();

      editPartyController.marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(editPartyController.party.location.lat, editPartyController.party.location.lng)
          });
      // editPartyController.markers.push(editPartyController.marker);

      document.getElementById('geocodeSubmit').addEventListener('click', function() {
        editPartyController.geocodeAddress(geocoder, map);
      });
    };

    editPartyController.geocodeAddress = function (geocoder, resultsMap) {
      var address = document.getElementById('address').value;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          editPartyController.marker.setMap(null);
          console.log("RESULTS:", results);
          editPartyController.party.location.address = results[0].formatted_address;
          editPartyController.party.location.lat = results[0].geometry.location.lat();
          editPartyController.party.location.lng = results[0].geometry.location.lng();
          console.log("Party location:", editPartyController.party.location);
          resultsMap.setCenter(results[0].geometry.location);
          editPartyController.marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
          // editPartyController.markers.push(editPartyController.marker);
          // console.log('Party Controller Markers:', editPartyController.markers);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    };

  }
});
