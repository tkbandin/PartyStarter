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

            <p style="text-align: center">Don't have an account? <a ui-sref="signup">Create one!</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  controller: function(Auth, $state) {
    this.errors = {};

    this.login = function(form) {
      this.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
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
