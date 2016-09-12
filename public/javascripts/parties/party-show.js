angular.module('myApp')
.component('partyShow', {
  template: `
    <div id="party-show" class="container">
      <div class="party-header">
        <i class="fa fa-birthday-cake" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
        <i class="fa fa-hand-o-right" aria-hidden="true"></i>
        <h3>Party Name: {{ $ctrl.party.name }}</h3>
        <p><b>Date: </b>{{ $ctrl.party.date }}</p>
        <p><b>Description: </b>{{ $ctrl.party.description }}</p>
      </div>
      <div class="party-body">

        <div class="party-info">
          <p><b>Start time: </b>{{ $ctrl.party.time.start }}</p>
          <p><b>End time: </b>{{ $ctrl.party.time.end }}</p>
            <div class="party-location">
              <p><b>Location: </b>{{ $ctrl.party.address }}</p>
              <p>Google Map snapshot will go here</p>
            </div>
        </div>

        <div class="party-people">
          <i class="fa fa-user" aria-hidden="true">people attending</i>
          <p><b>Organizer: </b>{{ $ctrl.party.organizer.username }}</p>
          <p><b>Created: </b>{{ $ctrl.party.updatedAt | date : "medium" }}</p>
          <p><b>Last Updated: </b>{{ $ctrl.party.createdAt | date : "medium" }}</p>
        </div>
      </div>

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


  }
});
