$(window).load(function () {
  $('.preloader').fadeOut('slow');
});

$('.sub-title').click(function() {
  Swal.fire({
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    preConfirm: (word) => {
      if (word !== 'bundawinata') {
        Swal.showValidationMessage(
          'Request failed!'
        );
      }
    },
    allowOutsideClick: true
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = '../main.html';
    }
  });
});

/* =Main INIT Function
-------------------------------------------------------------- */
function initializeSite() {

  'use strict';

  //OUTLINE DIMENSION AND CENTER
  (function () {
    function centerInit() {

      var sphereContent = $('.sphere'),
        sphereHeight = sphereContent.height(),
        parentHeight = $(window).height(),
        parentWidth = $(window).width(),
        topMargin = (parentHeight - sphereHeight) / 2;

      sphereContent.css({
        'margin-top': topMargin + 'px'
      });

      let space = 70;
      if (parentWidth > 700) {
        space = 125
      } else if (parentWidth > 400) {
        space = 80
      }

      var heroContent = $('.hero'),
        heroHeight = heroContent.height(),
        heroTopMargin = ((parentHeight - heroHeight) / 2) + space;

      heroContent.css({
        'margin-top': heroTopMargin + 'px'
      });

    }

    $(document).ready(centerInit);
    $(window).resize(centerInit);
  })();

  // Init effect 
  $('#scene').parallax();

};
/* END ------------------------------------------------------- */

/* =Document Ready Trigger
-------------------------------------------------------------- */
$(window).load(function () {

  initializeSite();
  (function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 0);
  })();

});
/* END ------------------------------------------------------- */


$('#countdown').countdown({
  date: 'Apr 01 2021',
  render: function (data) {
    var el = $(this.el);
    el.empty()
      //.append('<div>' + this.leadingZeros(data.years, 4) + '<span>years</span></div>')
      .append('<div>' + this.leadingZeros(data.days, 2) + ' <span>days</span></div>')
      .append('<div>' + this.leadingZeros(data.hours, 2) + ' <span>hrs</span></div>')
      .append('<div>' + this.leadingZeros(data.min, 2) + ' <span>min</span></div>')
      .append('<div>' + this.leadingZeros(data.sec, 2) + ' <span>sec</span></div>');
  }
});