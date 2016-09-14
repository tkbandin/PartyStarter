angular.module('myApp')
.component('partyShow', {
  template: `
    <div id="party-show">
      <div class="party-header z-depth-1 indigo-text">
        <div class="icons indigo-text">
            <i class='icon-span' title="18 and up only"><span ng-if="$ctrl.party.details.over18">18+</span></i>
            <i class='icon-span' title="21 and up only"><span ng-if="$ctrl.party.details.over21">21+</span></i>
            <i ng-if="$ctrl.party.details.byoBeer" class="fa fa-beer" aria-hidden="true" title="Bring your own beer"></i>
            <i ng-if="$ctrl.party.details.byoFood" class="fa fa-cutlery" aria-hidden="true" title="Bring your own food"></i>
            <i ng-if="$ctrl.party.details.movie" class="fa fa-film" aria-hidden="true" title="Movie party"></i>
            <i ng-if="$ctrl.party.details.music" class="fa fa-music" aria-hidden="true" title="Music"></i>
            <i ng-if="$ctrl.party.details.outdoors" class="fa fa-sun-o" aria-hidden="true" title="Outdoor party"></i>
            <i ng-if="$ctrl.party.details.birthday" class="fa fa-birthday-cake" aria-hidden="true" title="Birthday party"></i>
        </div>
        <h3>{{ $ctrl.party.name }}</h3>
        <p><b>Organized by: </b>{{ $ctrl.party.organizer.username }}</p>
        <p><b>Date: </b>{{ $ctrl.party.date }}</p>
        <p><b>Description: </b>{{ $ctrl.party.description }}</p>
      </div>

      <div class="party-body row red-text accent-2">
        <div class="party-info column">
          <i class="fa fa-clock-o fa-2x" aria-hidden="true"></i><p><b>Time: </b>{{ $ctrl.party.time.start }} to {{ $ctrl.party.time.end }}</p>
            <div class="party-location">
              <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
              <p><b>Location: </b>{{ $ctrl.party.location.address }}</p>
              <div id="showmap"></div>
            </div>
        </div>

        <div class="party-people column">
          <i class="fa fa-user fa-2x" aria-hidden="true"></i>

          <p><b>Created: </b>{{ $ctrl.party.updatedAt | date : "medium" }}</p>
          <p><b>Guest Attending: </b> {{ $ctrl.party.usersAttending }}</p>
          <p><b>Last Updated: </b>{{ $ctrl.party.createdAt | date : "medium" }}</p>
        </div>
      </div>

          <div class="food-list row">
            <i class="fa fa-cutlery fa-2x" aria-hidden="true"></i>
            <p><b>Food List:</b></p>
            <p>Help me out by bringing some stuff!</p>
              <table>
                <thead>
                  <tr>

                      <th data-field="name">Item Name</th>
                      <th data-field="have">Accounted For</th>
                      <th data-field="need">Still Need</th>
                      <th data-field="claim">Claim</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chips</td>
                    <td>2</td>
                    <td>4</td>
                    <td><a ui-sref="" class="btn btn yellow lighten-2 black-text">Claim!</a></td>
                  </tr>
                  <tr>
                    <td>Beer (12 pack)</td>
                    <td>2</td>
                    <td>2</td>
                    <td><a ui-sref="" class="btn btn yellow lighten-2 black-text">Claim!</a></td>
                  </tr>
                  <tr>
                    <td>Ice Cream</td>
                    <td>1</td>
                    <td>2</td>
                    <td><a ui-sref="" class="btn btn yellow lighten-2 black-text">Claim!</a></td>
                  </tr>
                </tbody>
              </table>
          </div>
      </div>

    <a ui-sref="parties" class="btn btn yellow lighten-2 black-text">Back</a>
    <a ng-click="$ctrl.edit(party)" class="btn yellow lighten-2 black-text">Edit</a>
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
      this.party.date = moment(this.party.date).format('MM-DD-YYYY');

      var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(this.party.location.lat, this.party.location.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(document.getElementById('showmap'), mapOptions);

      var marker = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(this.party.location.lat, this.party.location.lng)
      });

    });

  }
});
