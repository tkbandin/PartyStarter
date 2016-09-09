angular.module('myApp')
.component('partyShow', {
  template: `
    <h3>SHOW</h3>
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

    <a ui-sref="parties" class="btn btn-primary">Back</a>
    <a ng-click="$ctrl.edit(party)" class="btn btn-warning">Edit</a>
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
