angular.module('myApp')
.component('appFooter', {
  template: `
        <footer class="page-footer teal lighten-5">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="black-text">About PartyStarter</h5>
              <p class="black-text">Created by Group 5 for Project 3 of General Assembly's Web Development Immersive.</p>
            </div>
            <div class="col l4 offset-l2 s12">
              <h5 class="black-text">Contact</h5>
              <ul>
                <li><a class="black-text" href="https://github.com/jhdoak">Justin Doak</a></li>
                <li><a class="black-text" href="https://github.com/kirstenhumphreys">Kirsten Humphreys</a></li>
                <li><a class="black-text" href="https://github.com/sammershon">Sam Mershon</a></li>
                <li><a class="black-text" href="https://github.com/joshpereira">Josh Pereira</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">
          View our project on <a href="#">GitHub</a>.</p>
          <a class="black-text text-lighten-1 right" href="#!">More Links</a>
          </div>
        </div>
      </footer>
  `
});
