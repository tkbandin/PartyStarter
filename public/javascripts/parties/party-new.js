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
        <input type="text"
               class="form-control"
               name="date"
               ng-model="$ctrl.party.date">
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
        <label for="foodList.chosen">Food List</label>
        <input type="checkbox"
               class="form-control"
               name="completed"
               ng-model="$ctrl.party.foodList.chosen">
      </div>

      <div class="form-group">
        <label for="playlist.chosen">Playlist</label>
        <input type="checkbox"
               class="form-control"
               name="completed"
               ng-model="$ctrl.party.playlist.chosen">
      </div>

      <div class="form-group">
        <label for="entertainment.chosen">Entertainment</label>
        <input type="checkbox"
               class="form-control"
               name="completed"
               ng-model="$ctrl.party.entertainment.chosen">
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
