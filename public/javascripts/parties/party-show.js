angular.module('myApp')
.component('partyShow', {
  template: `
    <div class="main-landing">
    <h3>Show</h3>
    <p><b>Name: </b>{{ $ctrl.party.name }}</p>
    <p><b>ID: </b>{{ $ctrl.party._id }}</p>
    <p><b>Start time: </b>{{ $ctrl.party.time.start }}</p>
    <p><b>End time: </b>{{ $ctrl.party.time.end }}</p>
    <p><b>Date: </b>{{ $ctrl.party.date }}</p>
    <p><b>Location: </b>{{ $ctrl.party.address }}</p>
    <p><b>Description: </b>{{ $ctrl.party.description }}</p>
    <p><b>Organizer: </b>{{ $ctrl.party.organizer.username }}</p>
    <p><b>Created: </b>{{ $ctrl.party.updatedAt | date : "medium" }}</p>
    <p><b>Last Updated: </b>{{ $ctrl.party.createdAt | date : "medium" }}</p>

    <div id="showmap"></div>

    <a ui-sref="parties" class="btn btn-primary">Back</a>
    <a ng-click="$ctrl.edit(party)" class="btn btn-warning">Edit</a>
    </div>
  `,
  controller: function(partyService, $state, $stateParams) {
    this.party = null;

    this.edit = function() {
      $state.go('party-edit', { id: this.party._id });
    };

    partyService.getParty($stateParams.id)
    .then( res => {
      this.party = res.data;
      this.party.date = moment(this.party.date).format('MM-DD-YYYY')
    });

    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(33.7490,-84.3880),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(document.getElementById('showmap'), mapOptions);

  }
});
