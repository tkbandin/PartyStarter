angular.module('myApp')
.component('partyEdit', {
template: `
    <div class="main-landing edit-landing">
    <h3>Edit your party</h3>

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

     <div class="form-group detail-choices">
        <div class="detail-choice-box">
          <input type="checkbox" id='details.over18' class="form-control" name="details.over18" ng-model="$ctrl.party.details.over18"><label for="details.over18">18 and older</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.over21' class="form-control" name="details.over21" ng-model="$ctrl.party.details.over21"><label for="details.over21">21 and older</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.byoBeer' class="form-control" name="details.byoBeer" ng-model="$ctrl.party.details.byoBeer"><label for="details.byoBeer">Bring your own beer</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.byoFood' class="form-control" name="details.byoFood" ng-model="$ctrl.party.details.byoFood"><label for="details.byoFood">Bring your own food</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.movie' class="form-control" name="details.movie" ng-model="$ctrl.party.details.movie"><label for="details.movie">Movie</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.music' class="form-control" name="details.music" ng-model="$ctrl.party.details.music"><label for="details.music">Music</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.outdoors' class="form-control" name="details.outdoors" ng-model="$ctrl.party.details.outdoors"><label for="details.outdoors">Outdoors</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.birthday' class="form-control" name="details.birthday" ng-model="$ctrl.party.details.birthday"><label for="details.birthday">Birthday Party</label>
        </div>

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
          editPartyController.party.location.address = results[0].formatted_address;
          editPartyController.party.location.lat = results[0].geometry.location.lat();
          editPartyController.party.location.lng = results[0].geometry.location.lng();
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
