angular.module('myApp')
.component('parties', {
  template: `
    <div class="main-landing">
    <h1>Parties</h1>
    <div class="parties" ng-repeat = "party in $ctrl.parties">
      <span ng-click="$ctrl.toggle(party)" aria-hidden="true"></span>
      <span ng-click="$ctrl.toggle(party)" aria-hidden="true"></span>
      <a ng-click="$ctrl.show(party)">{{ party.name }}</a>
      <button ng-click="$ctrl.delete(party)">x</button>
    </div>
    <hr/>
    <a ui-sref="party-new" class="btn btn yellow">New</a>
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
