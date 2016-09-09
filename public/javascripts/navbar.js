angular.module('myApp')
.component('navbar', {
  template: `
    <div class='navbar-fixed'>
      <nav class="teal lighten-5" role="navigation">
        <div class="nav-wrapper">
          <a ui-sref="home" class="brand-logo">PartyStarter</a>
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>

          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li ng-hide="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('login')  }" ><a ui-sref="login">Login</a></li>
            <li ng-hide="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('signup') }" ><a ui-sref="signup">Sign Up</a></li>
            <li ng-show="$ctrl.Auth.isLoggedIn()" ><a disabled >Signed in as {{ $ctrl.Auth.getCurrentUserSync().email }}</a></li>
            <li ng-show="$ctrl.Auth.isLoggedIn()" ><a ui-sref="$ctrl.logout">Logout</a></li>
          </ul>

          <ul id="mobile-demo" class="side-nav">
            <li ng-hide="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('login')  }" ><a ui-sref="login">Login</a></li>
            <li ng-hide="$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('signup') }" ><a ui-sref="signup">Sign Up</a></li>
            <li ng-show="$ctrl.Auth.isLoggedIn()" ><a disabled >Signed in as {{ $ctrl.Auth.getCurrentUserSync().email }}</a></li>
            <li ng-show="$ctrl.Auth.isLoggedIn()" ><a ui-sref="$ctrl.logout">Logout</a></li>
          </ul>

        </div>
      </nav>
    </div>
  `,
  controller: function(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;

    this.logout = function() {
      this.Auth.logout()
      .then( res => {
        this.$state.go('login');
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
