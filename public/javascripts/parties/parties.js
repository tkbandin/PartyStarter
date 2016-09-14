angular.module('myApp')
.component('parties', {
  template: `
    <div class="party-page z-depth-1">
    <h3>Parties</h3>
    <div class="parties" ng-repeat = "party in $ctrl.parties">
      <span ng-click="$ctrl.toggle(party)" aria-hidden="true"></span>
      <span ng-click="$ctrl.toggle(party)" aria-hidden="true"></span>
      <div ng-click="$ctrl.show(party)">
      <h4> {{ party.name }} </h4> <i class="fa fa-times" aria-hidden="true" ng-click="$ctrl.delete(party)"></i>
      <p> {{ party.description }} </p>
      </div>
      <hr>
    </div>
    <hr/>
    <a ui-sref="party-new" class="btn btn yellow lighten-2 black-text">New</a>
    </div>
  `,
  controller: function(partyService, $state) {
    this.parties = null;

    this.getParties = function() {
      partyService.getParties()
      .then( res => {
        this.parties = res.data;
      });
    };

    this.getParties();

    this.show = function(party) {
      $state.go('party-show', { id: party._id });
    };

    // this.toggle = function(party) {
    //   partyService.toggle(party)
    //   .then( res => {
    //     this.getParties();
    //   });
    // };

    this.delete = function(party) {
      partyService.delete(party)
      .then( res => {
        this.getParties();
      });
    };
  }
});
