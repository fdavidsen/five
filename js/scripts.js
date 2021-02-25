const menuName = {
  'home'        : 'Home',
  'member'      : 'Our Members',
  'photo'       : 'Our Photos',
  'video'       : 'Our Videos',
  'contributor' : 'Contributors'
}

$('a[data-section]').on('click', function() {
  const section = $(this).data('section');

  $('section#' + section).addClass('active').siblings('section').removeClass('active');
  $('title').html('FIVE - ' + menuName[section]);
  
  if (section === 'home') {
    $('.btn-home').css('display', 'none')
  } else {
    $('.btn-home').css('display', 'inline');
  }
});