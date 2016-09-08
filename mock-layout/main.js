// NEW PARTY FORM

angular
  .module('MyApp',['ngMaterial', 'ngMessages', 'ui.materialize'])
  .controller('newParty', function($scope) {

    $scope.party = {
      creator: 'Team 5',
      email: 'team5@party.com',
      name: 'Beltline Lantern Party',
      address: '699 Ponce de Leon Avenue NE',
      city: 'Atlanta',
      state: 'GA',
      description: 'Come watch the Beltline Lantern Festival from the window of my apartment! BYOB, some snacks, and I hope you are not allergic to cats..',
      postalCode: '30308'
    };

    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      });
  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });
