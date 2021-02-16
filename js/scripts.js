$('section').not('#home').hide();

$('.navbar-nav a').on('click', function() {
  const section = $(this).data('section');
  $(this).addClass('active').siblings().removeClass('active');
  $('section#' + section).show().siblings('section').hide();
});