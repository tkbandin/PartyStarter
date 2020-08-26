angular.module('myApp')
.component('about', {
  template: `
    <div id="about">
      <div class="about-header z-depth-1 indigo-text">
        <i class="fa fa-smile-o" aria-hidden="true"></i>
        <i class="fa fa-asterisk" aria-hidden="true"></i>
        <i class="fa fa-star-o" aria-hidden="true"></i>
        <h2>Hi!</h2>
        <h5>PartyStarter was created for project three of General Assembly's Web Development Immersive by three students in Atlanta, GA.</h5>
        <p>We created a web app using the MEAN stack and two models created with Mongoose. We chose to create an application to help users organize parties.</p>
        <a class="indigo-text" href="https://github.com/sammershon/Project3">View our project on GitHub!</a></li>

      </div>

      <div class="about-body red-text accent-2 row">
        <div class="tech-used col s5">
          <i class="fa fa-laptop" aria-hidden="true"></i>
          <h5>Technologies used: </h5>
          <ul>
          <li><b>Languages:</b> HTML5, CSS3, JavaScript</li>
          <li><b>MEAN Stack:</b> MongoDB, ExpressJS, AngularJS, and NodeJS</li>
          <li><b>UI Framework:</b> Angular-Material, MaterializeCSS</li>
          <li><b>ODM:</b> Mongoose</li>
          <li><b>Security:</b> PassportJS, bcrypt-nodejs</li>
          <li><b>Mockups:</b> Pen and Paper</li>
          <li><b>Project Planning & User Stories:</b> Trello</li>
          <li><b>API:</b> Google Maps</li>
          </ul>
        </div>

        <div class="contact col s5">
          <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
          <h5>Created By:</h5>
          <ul>
          <li><a class="red-text accent2" href="https://github.com/jhdoak">Justin Doak</a></li>
          <li><a class="red-text accent2" href="https://github.com/kirstenhumphreys">Kirsten Humphreys</a></li>
          <li><a class="red-text accent2" href="https://github.com/sammershon">Sam Mershon</a></li>
          </ul>
        </div>
      </div>
      <h5><a class="indigo-text" href="https://www.youtube.com/watch?v=FYxvPOK6_xg">Party On, PartyStarter!</a></h5>
      <br>
    </div>
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
