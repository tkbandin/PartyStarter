angular.module('myApp')
.component('about', {
  template: `
    <section class="container text-center">
      <h1>Hi!</h1>
      <p>PartyStarter was created for our third project by four of General Assembly's Web Development Immersive Students in Atlanta, GA.</p>
      <p>We created a web app using the MEAN stack and at least two models created with Mongoose. We chose to create an application to help users organize parties.

      <h4>Technologies used: </h4>
      <ul>
      <li><b>Languages:</b> HTML5, CSS3, JavaScript</li>
      <li><b>MEAN Stack:</b> MongoDB, ExpressJS, AngularJS, and NodeJS</li>
      <li><b>UI Framework:</b> Angular-Material, MaterializeCSS</li>
      <li><b>ODM:</b> Mongoose</li>
      <li><b>Security:</b> PassportJS, bcrypt-nodejs</li>
      <li><b>Mockups:</b> Pen and Paper</li>
      <li><b>Project Planning & User Stories: - Trello</li>
      <li><b>API:</b>Google Maps</li>
      </ul>

      <h4>Contact:</h4>
      <ul>
      <li><a class="black-text" href="https://github.com/jhdoak">Justin Doak</a></li>
      <li><a class="black-text" href="https://github.com/kirstenhumphreys">Kirsten Humphreys</a></li>
      <li><a class="black-text" href="https://github.com/sammershon">Sam Mershon</a></li>
      <li><a class="black-text" href="https://github.com/joshpereira">Josh Pereira</a></li>
      </ul>


      <br>
      <h3>Party On! <i class="fa fa-smile-o fa-1x" aria-hidden="true"></i></h3>
    </section>
  `,
  controller: function() {
    /*this.clientTechnologies = [
      'Angular 1.5',
      'Twitter Bootstrap',
      'Angular Messages (ngMessages)',
      'Angular Animate (ngAnimate)',
      'Angular UI Router'
    ];
    this.serverTechnologies = [
      'Express 4',
      'Passport',
      'Mongoose',
      'MongoDB',
      'NodeJS 6'
    ];*/
  }
});
