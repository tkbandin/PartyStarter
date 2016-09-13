angular.module('myApp')
.component('home', {
  template: `
  <div id="home-page">
    <div class='main-landing z-depth-1'>
      <i class="fa fa-smile-o fa-3x" aria-hidden="true"></i>
      <h2>Hey, Party Starter!</h2>
      <p>This is an explanation and it is super exciting and makes you want to part and use our app. It is really cool because you can do a lot of stuff.</p>
      <a class="waves-effect waves-light btn yellow lighten-2 black-text" ui-sref="signup">Get Started</a>
    </div>
  </div>
  `,
  controller: function() {
    this.name = 'Party App!';
  }
});



//Old Section Tag
// <section class="container well text-center">
//   <h1>Welcome to the</h1>
//   <h1>{{ $ctrl.name }}</h1>
// </section>
