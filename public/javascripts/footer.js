angular.module('myApp')
.component('appFooter', {
  template: `
      <footer class="page-footer teal lighten-5">

          <div class="row">
            <div class="col s12">
              <p class="black-text">Created by Group 5 for Project 3 of General Assembly's Web Development Immersive.</p>
            </div>
          </div>

            <div class='divider'></div>

            <ul class='row'>
              <li class='col s3'><a class="black-text" href="https://github.com/jhdoak">Justin Doak</a></li>
              <li class='col s3'><a class="black-text" href="https://github.com/kirstenhumphreys">Kirsten Humphreys</a></li>
              <li class='col s3'><a class="black-text" href="https://github.com/sammershon">Sam Mershon</a></li>
              <li class='col s3'><a class="black-text" href="https://github.com/joshpereira">Josh Pereira</a></li>
            </ul>



        <div class="footer-copyright">
          <p>View our project on <a href="https://github.com/sammershon/Project3">GitHub</a>.</p>
        </div>
      </footer>
  `
});
