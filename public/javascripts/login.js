angular.module('myApp')
.component('login', {
  template: `
  <div class="main-landing z-depth-1">
    <div class="row">
      <div class="col-sm-12">
        <h2>Login</h2>
      </div>
      <div class="col-sm-12">
        <form class="form" name="form" ng-submit="$ctrl.login(form)" novalidate>

          <div class="form-group">
            <label>Email</label>

            <input type="email" name="email" class="form-control" ng-model="$ctrl.user.email" required>

          </div>

          <div class="form-group">
            <label>Password</label>

            <input type="password" name="password" class="form-control" ng-model="$ctrl.user.password" required>
          </div>

          <div class="form-group has-error">
            <p class="help-block" ng-show="form.email.$error.required && form.password.$error.required && $ctrl.submitted">
               Please enter your email and password.
            </p>
            <p class="help-block" ng-show="form.email.$error.email && $ctrl.submitted">
               Please enter a valid email.
            </p>

            <p class="help-block">{{ $ctrl.errors.login }}</p>
          </div>

          <div>
            <button class="waves-effect waves-light btn btn-login yellow lighten-2 black-text" type="submit">
              Login
            </button>

            <p>Don't have an account? <a ui-sref="signup">Create one!</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  controller: function(Auth, $state, $rootScope) {
    this.errors = {};

    this.login = function(form) {
      this.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          $rootScope.$emit('LOGIN_CHECK', 'event sent from login.js');
          // Logged in, redirect to parties
          $state.go('parties');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
      }
    };
  }
});

// <div class='main-landing'>
//   <div class='signin'>
//     <h2>Sign In</h2>
//     <form name="signin">
//     <md-input-container>
//       <label>Username</label>
//       <input name="username" ng-model="user.username" required>
//       <div ng-messages="signin.username.$error">
//         <div ng-message="required">This is required!</div>
//       </div>
//     </md-input-container>
//     <md-input-container>
//       <label>Password</label>
//       <input type="password" ng-model="user.local.password" required>
//       <div ng-messages="sigin.password.$error">
//         <div ng-message="required">This is required!</div>
//       </div>
//     </md-input-container>
//     <br>
//     <md-button class="md-raised" input type="submit">Sign In</button>
//     </form>
//   </div>
//   <p>Don't have an account? <a href="signup.html">Create one!</a></p>
// </div>
