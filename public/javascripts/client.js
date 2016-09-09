angular.module('myApp', ['ngMessages', 'ngAnimate', 'ui.router', 'ngMaterial', 'ngAria']);

angular.module('myApp')
.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
  .state('home', {
    url: "/home",
    template: "<home></home>"
  })
  .state('about', {
    url: "/about",
    template: "<about></about>"
  })
  .state('login', {
    url: "/login",
    template: "<login></login>"
  })
  .state('signup', {
    url: "/signup",
    template: "<signup></signup>"
  })
  .state('parties', {
    url: "/parties",
    template: "<parties></parties>"
  })
  .state('party-new', {
    url: "/parties/new",
    template: "<party-new></party-new>"
  })
  .state('party-show', {
    url: "/parties/:id",
    template: "<party-show></party-show>"
  })
  .state('party-edit', {
    url: "/parties/edit/:id",
    template: "<party-edit></party-edit>"
  });

});
