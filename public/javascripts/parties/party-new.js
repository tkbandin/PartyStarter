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
      address: '',
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
  }
});
