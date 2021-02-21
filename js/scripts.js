$('a[data-section]').on('click', function() {
  const section = $(this).data('section');
  $('section#' + section).addClass('active').siblings('section').removeClass('active');
  
  if (section === 'home') {
    $('.btn-home').css('display', 'none')
  } else {
    $('.btn-home').css('display', 'inline');
  }
});