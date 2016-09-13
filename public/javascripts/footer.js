angular.module('myApp')
.component('appFooter', {
  template: `
  <footer class="page-footer teal lighten-5">
      <div class="container">
      © 2016 Copyright Text
      <a class="blue-text right" ui-sref="about">About PartyStarter</a>
    </div>
  </footer>
  `
});
