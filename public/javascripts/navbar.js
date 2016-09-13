angular.module('myApp')
.component('navbar', {
  template: `
    <div ng-cloak class='navbar-fixed'>
      <nav class="teal lighten-5" role="navigation">
        <div class="nav-wrapper">
          <a ui-sref="home" class="brand-logo">PartyStarter</a>
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>

          <ul id="nav-mobile" ng-if="!vmNavbar.isLoggedIn" class="right hide-on-med-and-down">
            <li ng-class="{active: vmNavbar.$state.includes('login')  }" ><a ui-sref="login">Login</a></li>
            <li ng-class="{active: vmNavbar.$state.includes('signup') }" ><a ui-sref="signup">Sign Up</a></li>
          </ul>

          <ul id="nav-mobile" ng-if="vmNavbar.isLoggedIn" class="right hide-on-med-and-down">
            <li><a ui-sref="parties" >Signed in as {{ vmNavbar.getUser.email }}</a></li>
            <li><a ng-click="vmNavbar.logout()">Logout</a></li>
          </ul>

          <ul id="mobile-demo" class="side-nav">
            <li ng-hide="vmNavbar.Auth.isLoggedIn()" ng-class="{ active: vmNavbar.$state.includes('login')  }" ><a ui-sref="login">Login</a></li>
            <li ng-hide="vmNavbar.Auth.isLoggedIn()" ng-class="{ active: vmNavbar.$state.includes('signup') }" ><a ui-sref="signup">Sign Up</a></li>
            <li ng-show="vmNavbar.Auth.isLoggedIn()" ><a ui-sref="parties" >Signed in as {{ vmNavbar.getUser.email }}</a></li>
            <li ng-show="vmNavbar.Auth.isLoggedIn()" ><a ng-click="vmNavbar.logout()">Logout</a></li>
          </ul>

        </div>
      </nav>
    </div>
  `,
  bindToController: true,
  controllerAs: 'vmNavbar',
  controller: function(Auth, $state, $rootScope) {
    var vmNavbar = this;
    vmNavbar.$state = $state;
    vmNavbar.Auth = Auth;
    vmNavbar.isLoggedIn = vmNavbar.Auth.isLoggedIn();
    vmNavbar.getUser = vmNavbar.Auth.getCurrentUserSync();
    console.log('Auth:', Auth);
    console.log(vmNavbar.isLoggedIn);

    $rootScope.$on('LOGIN_CHECK', function(res){
      console.log('Triggered Event');
      console.log('getUser:', vmNavbar.getUser);
      console.log(vmNavbar.isLoggedIn);
      vmNavbar.isLoggedIn = Auth.isLoggedIn();
      vmNavbar.getUser = Auth.getCurrentUserSync();
    });

    vmNavbar.logout = function() {
      Auth.logout()
      .then( res => {
        vmNavbar.isLoggedIn = Auth.isLoggedIn();
        $state.go('login');
      });
    };

    $(".button-collapse").sideNav();

  }
});

// ul right class: hide-on-sm-and-down

// Old Bootstrap NavBar
// <nav class="navbar navbar-fixed-top navbar-default">
//   <div class="container-fluid">
//     <div class="navbar-header">
//       <a class="navbar-brand" ui-sref="home">
//         <span class="glyphicon glyphicon-fire"></span> Party Starter App
//       </a>
//     </div>
//     <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
//       <ul class="nav navbar-nav">
//         <li ng-class="{ active: $ctrl.$state.includes('home') }" ><a ui-sref="home">Home</a></li>
//         <li ng-class="{ active: $ctrl.$state.includes('about') }" ><a ui-sref="about">About</a></li>
//         <li ng-show="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('parties') }" ><a ui-sref="parties">Parties</a></li>
//       </ul>
//       <ul class="nav navbar-nav navbar-right">
//         <li ng-hide="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('login')  }" ><a ui-sref="login">Login</a></li>
//         <li ng-hide="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('signup') }" ><a ui-sref="signup">Sign Up</a></li>
//         <p ng-show="$ctrl.Auth.isLoggedIn()" class="navbar-text">Signed in as {{ $ctrl.Auth.getCurrentUserSync().email }}</p>
//         <button ng-show="$ctrl.Auth.isLoggedIn()" type="button" class="btn btn-default navbar-btn" ng-click="$ctrl.logout()">Logout</button>
//       </ul>
//     </div>
//   </div>
// </nav>
