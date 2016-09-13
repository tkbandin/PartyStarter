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

    <div class='food-list' ng-if='$ctrl.party.foodList.chosen'>
      <table>
        <tr>
          <th>Food</th>
          <th>Accounted For</th>
          <th>Still Needed</th>
        </tr>
        <tr ng-repeat='food in $ctrl.party.foodList.list'>
          <td>{{ food.name }} <button ng-click="$ctrl.claimOneFood(food._id)">Claim one!</button></td>
          <td>{{ food.amount.claimed }} </td>
          <td>{{ food.amount.needed - food.amount.claimed }} </td>
        </tr>
      </table>
    </div>

    <div class='user-food-list' ng-if='$ctrl.currentUser.foodToBring.length > 0'>
      <table>
        <tr>
          <th>Food</th>
          <th>Amount you're bringing</th>
        </tr>
        <tr ng-repeat='food in $ctrl.currentUser.foodToBring'>
          <td>{{ food.name }} </td>
          <td>{{ food.amountBringing }} </td>
        </tr>
      </table>
    </div>

    <a ui-sref="parties" class="btn btn-primary">Back</a>
    <a ng-click="$ctrl.edit(party)" class="btn btn-warning">Edit</a>
    </div>
  `,
  controller: function(Auth, partyService, $state, $stateParams, filterFilter) {
    this.party = null;
    this.foodListChosen = false;

    this.edit = function() {
      $state.go('party-edit', { id: this.party._id });
    };

    this.claimOneFood = function(foodId) {
      console.log("I Fired!");
      console.log('Food:', foodId);
      console.log('FilteredFood:', filterFilter(this.party.foodList.list, foodId));
      filterFilter(this.party.foodList.list, foodId)[0].amount.claimed += 1;
      // console.log('before add:', this.party.foodList.list.find(foodId).amount.claimed);
      // this.party.foodList.list.find(foodId).amount.claimed += 1;
      // console.log('after add:', this.party.foodList.list.find(foodId).amount.claimed);
    };

    partyService.getParty($stateParams.id)
    .then( res => {
      this.party = res.data;
      this.party.date = moment(this.party.date).format('MM-DD-YYYY');
      console.log('This party:', this.party);
    });

    Auth.getCurrentUserParties($stateParams.id)
    .then( res => {
      console.log('User party res:', res);
      this.currentUser = res;
      console.log('Current User:', this.currentUser);
      // currentUser.p
    });

  }
});
