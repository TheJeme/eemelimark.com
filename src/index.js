import initTilt from './js/tilt';
import initSr from './js/sr';
import './style/main.scss';
import resumePdf from './assets/Resume.pdf';

const resumeLink = document.getElementById('resume-link');
if (resumeLink) {
  resumeLink.href = resumePdf;
}

$('a[href^="#"]').on('click', function(event) {
  var target = $(this.getAttribute('href'));
  if (target.length) {
    event.preventDefault();
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: target.offset().top
        },
        1000
      );
  }
});

initSr();
initTilt();
