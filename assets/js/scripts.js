function memberSection() {
  function getSeconds(date) {
    const monthNumber = {'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 'Mei': 4, 'Juni': 5, 'Juli': 6, 'Agustus': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11};
    date = date.split(' ');
    const day   = date[0];
    const month = monthNumber[date[1]];
    const year  = date[2];
    date = new Date(2003, month, day);
    return date.getTime();
  }
  
  $.ajax({
    url: 'assets/json/biographies.json',
    method: 'GET',
    dataType: 'JSON',
    success: function(result) {
      let content = '';
      const year2005 = new Date(2005, 0, 1);
      result.forEach(item => {
        const birthdayTime = (item.birthday !== undefined) ? getSeconds(item.birthday) : year2005.getTime();
        const birthday = (item.birthday !== undefined) ? `<p class="mb-1"><i class="fas fa-birthday-cake me-2"></i>${ item.birthday.slice(0, item.birthday.length - 5) }</p>` : '';     
        const email = (item.email !== undefined) ? `<p class="mb-1"><i class="far fa-envelope me-2"></i>${ item.email }</p>` : '';
        const zodiac = (item.zodiac !== undefined) ? `<p class="mb-1"><i class="far fa-star me-2"></i>${ item.zodiac }</p>` : '';
        const hobby = (item.hobby !== undefined) ? `<p class="mb-1"><i class="far fa-heart me-2"></i>${ item.hobby }</p>` : '';
        const message = (item.message !== undefined) ? `<p class="mb-1"><i class="far fa-smile-wink me-2"></i>${ item.message }</p>` : '';
        const instagram = (item.instagram !== undefined) ?
          `<p class="mb-1">
            <i class="fab fa-instagram me-2"></i>
            <a href="https://www.instagram.com/${ item.instagram }/" target="_blank">
              ${ item.instagram }
            </a>
          </p>` : '';
        const quote = (item.quote !== undefined) ?
          `<div class="card-footer bg-dark text-center border-top-0 py-2">
            <sup><small><i class="fas fa-quote-left text-muted"></i></small></sup>
            <blockquote class="fst-italic my-0">
              ${ item.quote }
            </blockquote>
            <sup><small><i class="fas fa-quote-right text-muted"></i></small></sup>
          </div>` : '';
        const [bio, imgPaddingBottom] = ( (birthday + instagram + email + zodiac + hobby + message) !== '' ) ? [
          `<div class="col-md-6 text-center bio-text">
            <div class="card-body d-inline-block text-start">
              ${ birthday }
              ${ instagram }
              ${ email }
              ${ zodiac }
              ${ hobby }
              ${ message }                 
            </div>
          </div>`, 'pb-1'] : ['', ''];
        
        content += `
          <div class="col-md-6 col-xxl-4 filtr-item" data-category="${ item.gender }" data-name="${ item.name }" data-birthday="${ birthdayTime }" data-id="${ item.class_number }">
            <div class="card border-0 shadow mb-5">
              <div class="card-header bg-dark text-center border-bottom-0 py-3">
                <h6 class="card-title text-white fw-bold mb-0">${ item.name }</h6>
              </div>
              <div class="card rounded-bottom rounded-0 border-0">
                <div class="row justify-content-center g-0">
                  <div class="col-md-6 d-flex align-items-center p-3 ${ imgPaddingBottom } bio-img">
                    <div class="card-img">
                      <img alt="${ item.name }" src="${ item.picture }" class="w-100 rounded">
                    </div>
                  </div>
                  ${ bio }
                </div>
              </div>
              ${ quote }
            </div>
          </div>
        `;
      });
      $('#member .row.filter-container').html(content);
    }
  });
}

function photoSection() {
  $.ajax({
    url: 'assets/json/photos.json',
    method: 'GET',
    dataType: 'JSON',
    success: function(result) {
      let content = '';
      result.forEach(item => {
        content += `
        <div class="col-md-4 col-xxl-3 my-3">
          <div class="card border-0 shadow">
            <img src="${ item.source }" class="w-100 rounded" alt="">
          </div>
        </div>
        `;
      });
      $('#photo .row').html(content);
    }
  });
}

function videoSection() {
  $.ajax({
    url: 'assets/json/videos.json',
    method: 'GET',
    dataType: 'JSON',
    success: function(result) {
      let content = '';
      result.forEach(item => {
        content += `
          <div class="col-md-4 col-xxl-3 my-3">
            <video class="w-100" controls src="${ item.source }"></video>
          </div>
        `;
      });
      $('#video .row').html(content);
    }
  });
}

function contributorSection() {
  $.ajax({
    url: 'assets/json/contributors.json',
    method: 'GET',
    dataType: 'JSON',
    success: function(result) {
      let content = '';
      result.forEach(item => {
        const [instagramLink, instagram] = (item.instagram !== undefined) ? [`https://www.instagram.com/${ item.instagram }/`, `@${ item.instagram }`] : ['#', ''];
        content += `
          <a class="list-group-item list-group-item-action" href="${ instagramLink }">
            <div class="wrapper d-flex align-items-center">
              <img class="rounded me-3" src="${ item.picture }" alt="${ item.name }">
              <p class="d-inline-block fs-6 mb-0">
                <strong>${ item.name }</strong>
                ${ instagram }
              </p>
            </div>
          </a>
        `;
      });
      $('#contributor .list-group').html(content);
    }
  });
}

memberSection();
photoSection();
videoSection();
contributorSection();



const menuName = {
  'home'        : 'Home',
  'member'      : 'Our Members',
  'photo'       : 'Our Photos',
  'video'       : 'Our Videos',
  'contributor' : 'Contributors'
}

$('a[data-section]').on('click', function() {
  const filterizr = new Filterizr('.filter-container', { layout: 'packed' });
  const section = $(this).data('section');

  $('section#' + section).addClass('active').siblings('section').removeClass('active');
  $('title').html('FIVE - ' + menuName[section]);
  
  if (section === 'home') {
    $('.btn-home').css('display', 'none')
  } else {
    $('.btn-home').css('display', 'inline');
  }
});

$('.filter-wrapper button').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');
});
  
$(function() {
  $(window).on('load resize', function() {
    if ($(this).width() >= 768) {
      const imgWidth = $('#photo img').width();
      $('#photo img').height(imgWidth);
  
      const videoWidth = $('#video video').width();
      $('#video video').height(videoWidth);
    }
  });
});