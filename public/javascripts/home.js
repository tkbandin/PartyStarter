angular.module('myApp')
.component('home', {
  template: `
  <div class='main-landing'>
    <i class="material-icons">insert_emoticon</i>
    <h2>Hey!</h2>
    <h3>Welcome to the {{ $ctrl.name }}</h3>
    <p>This is an explanation and it is super exciting and makes you want to part and use our app. It is really cool because you can do a lot of stuff.</p>
    <a class="waves-effect waves-light btn" href="!#">Get Started</a>
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
