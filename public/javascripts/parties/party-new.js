angular.module('myApp')
.component('partyNew', {
  template: `
    <div class="main-landing">
    <h3>New</h3>

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
        <label for="date">Date</label>
        <md-datepicker ng-model="$ctrl.party.date"
                       md-placeholder="Enter date">
                       </md-datepicker>
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input type="text"
               class="form-control"
               name="address"
               ng-model="$ctrl.party.address">
      </div>

      <div id="geocoder">
        <input id="address" type="textbox" value="Atlanta, GA">
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

      <a ui-sref="parties" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
    </div>
  `,
  controller: function(partyService, $state) {
    this.party = {
      name: '',
      time: {
        start: ''
      },
      date: '',
      location: {
        address: '',
        lat: '',
        lng: ''
      },
      description: '',
      foodList: {
        chosen: false
      },
      playlist: {
        chosen: false
      },
      entertainment: {
        chosen: false
      }
    };

    this.save = function() {
      partyService.create(this.party)
      .then( res => {
        $state.go('parties');
      });
    };

     initMap = function() {
        var map = new google.maps.Map(document.getElementById('geocodeMap'), {
          zoom: 11,
          center: {lat: 33.7490, lng: -84.3880}
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('geocodeSubmit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      }

      geocodeAddress = function (geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        //var loc = [];
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            //this.party.location.lat = results[0].geometry.location.lat();
            //this.party.location.lng = results[0].geometry.location.lng();
            /*loc[0]=results[0].geometry.location.lat();
            loc[1]=results[0].geometry.location.lng();
            console.log(loc);*/
            console.log(this);
            //console.log(this.party.location.lat);
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    initMap();
  }
});
