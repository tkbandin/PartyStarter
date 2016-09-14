angular.module('myApp')
.component('home', {
  template: `
  <div id="home-page">
    <div class='main-landing z-depth-1'>
      <i class="fa fa-smile-o fa-3x" aria-hidden="true"></i>
      <h2>Hey, Party Starter!</h2>
      <p>Looking for a way to plan and organize your next party? With PartyStarter you can create a party to share with your friends.</p>
      <a class="waves-effect waves-light btn yellow lighten-2 black-text" ui-sref="signup">Get Started</a>
      <p>Already have an account? Log in <a ui-sref="login">here!</a></p>
      <h6 style="font-size: 10px">PartyStarter unofficially endorsed by Will Smith.</h6>
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
