"use strict";

angular.module("myApp").component("signup", {
  template: "\n  <div class=\"main-landing z-depth-1\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <h2>Sign up</h2>\n      </div>\n      <div class=\"col-sm-12\">\n        <form class=\"form\" name=\"form\" ng-submit=\"this.register(form)\" novalidate>\n\n          <div class=\"form-group\" ng-class=\"{ 'has-success': form.name.$valid && $ctrl.submitted,\n                                              'has-error': form.name.$invalid && $ctrl.submitted }\">\n            <label>Name</label>\n\n            <input type=\"text\" name=\"name\" class=\"form-control\" ng-model=\"$ctrl.user.name\"\n                   required/>\n            <p class=\"help-block\" ng-show=\"form.name.$error.required && $ctrl.submitted\">\n              A name is required\n            </p>\n          </div>\n\n          <div class=\"form-group\" ng-class=\"{ 'has-success': form.email.$valid && $ctrl.submitted,\n                                              'has-error': form.email.$invalid && $ctrl.submitted }\">\n            <label>Email</label>\n\n            <input type=\"email\" name=\"email\" class=\"form-control\" ng-model=\"$ctrl.user.email\"\n                   required\n                   mongoose-error/>\n            <p class=\"help-block\" ng-show=\"form.email.$error.email && $ctrl.submitted\">\n              Doesn't look like a valid email.\n            </p>\n            <p class=\"help-block\" ng-show=\"form.email.$error.required && $ctrl.submitted\">\n              What's your email address?\n            </p>\n            <p class=\"help-block\" ng-show=\"form.email.$error.mongoose\">\n              {{ this.errors.email }}\n            </p>\n          </div>\n\n          <div class=\"form-group\" ng-class=\"{ 'has-success': form.password.$valid && $ctrl.submitted,\n                                              'has-error': form.password.$invalid && $ctrl.submitted }\">\n            <label>Password</label>\n\n            <input type=\"password\" name=\"password\" class=\"form-control\" ng-model=\"$ctrl.user.password\"\n                   ng-minlength=\"3\"\n                   required\n                   mongoose-error/>\n            <p class=\"help-block\"\n               ng-show=\"(form.password.$error.minlength || form.password.$error.required) && $ctrl.submitted\">\n              Password must be at least 3 characters.\n            </p>\n            <p class=\"help-block\" ng-show=\"form.password.$error.mongoose\">\n              {{ $ctrl.errors.password }}\n            </p>\n          </div>\n\n          <div class=\"form-group\" ng-class=\"{ 'has-success': form.confirmPassword.$valid && $ctrl.submitted,\n                                              'has-error': form.confirmPassword.$invalid && $ctrl.submitted }\">\n            <label>Confirm Password</label>\n            <input type=\"password\" name=\"confirmPassword\" class=\"form-control\" ng-model=\"$ctrl.user.confirmPassword\"\n                   match=\"$ctrl.user.password\"\n                   ng-minlength=\"3\" required/>\n            <p class=\"help-block\"\n               ng-show=\"form.confirmPassword.$error.match && $ctrl.submitted\">\n              Passwords must match.\n            </p>\n          </div>\n\n          <div>\n            <button class=\"btn btn-inverse btn-lg btn-register yellow lighten-2 black-text\" type=\"submit\">\n              Sign up\n            </button>\n          </div>\n\n        </form>\n        <p>Already have an account? Log in <a ui-sref=\"login\">here!</a></p>\n\n      </div>\n    </div>\n\n  </div>\n  ",
  controller: function controller(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;

    this.register = function (form) {
      var _this = this;

      this.submitted = true;

      if (form.$valid) {
        return this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        }).then(function () {
          // Account created, redirect to todos
          _this.$state.go("parties");
        })["catch"](function (err) {
          err = err.data;
          _this.errors = {}; // Update validity of form fields that match the mongoose errors

          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity("mongoose", false);
            _this.errors[field] = error.message;
          });
        });
      }
    };
  }
});