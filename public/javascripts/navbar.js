angular.module('myApp')
.component('navbar', {
  template: `
    <div class='navbar-fixed'>
      <nav class="teal lighten-5" role="navigation">
        <div class="nav-wrapper">
          <a ng-if="!$ctrl.Auth.isLoggedIn()" ui-sref="home" class="brand-logo">PartyStarter</a>
          <a ng-if="$ctrl.Auth.isLoggedIn()" ui-sref="parties" class="brand-logo">PartyStarter</a>
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>

          <ul id="nav-mobile" ng-if="!$ctrl.Auth.isLoggedIn()" class="right hide-on-med-and-down">
            <li ng-class="{active: $ctrl.$state.includes('login')  }" ><a ui-sref="login">Login</a></li>
            <li ng-class="{active: $ctrl.$state.includes('signup') }" ><a ui-sref="signup">Sign Up</a></li>
          </ul>

          <ul id="nav-mobile" ng-if="$ctrl.Auth.isLoggedIn()" class="right hide-on-med-and-down">
            <li><a ui-sref="parties" >Signed in as {{ $ctrl.Auth.getCurrentUserSync().email }}</a></li>
            <li><a ng-click="$ctrl.logout()">Logout</a></li>
          </ul>

          <ul id="mobile-demo" class="side-nav">
            <li ng-if="!$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('login')  }" ><a ui-sref="login">Login</a></li>
            <li ng-if="!$ctrl.Auth.isLoggedIn()" ng-class="{ active: $ctrl.$state.includes('signup') }" ><a ui-sref="signup">Sign Up</a></li>
            <li ng-if="$ctrl.Auth.isLoggedIn()" ><a ui-sref="parties" >Signed in as {{ $ctrl.Auth.getCurrentUserSync().email }}</a></li>
            <li ng-if="$ctrl.Auth.isLoggedIn()" ><a ng-click="$ctrl.logout()">Logout</a></li>
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
  }
});

