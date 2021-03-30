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
  url: 'assets/json/biography.json',
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
      const joke = (item.joke !== undefined) ? `<p class="mb-1"><i class="far fa-smile-wink me-2"></i>${ item.joke }</p>` : '';
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
        </div>`: '';
      const [bio, imgPaddingBottom] = ( (birthday + instagram + email + zodiac + hobby + joke) !== '' ) ? [
        `<div class="col-md-6 text-center bio-text">
          <div class="card-body d-inline-block text-start">
            ${ birthday }
            ${ instagram }
            ${ email }
            ${ zodiac }
            ${ hobby }
            ${ joke }                 
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
                    <img alt="${ item.name }" src="https://drive.google.com/uc?export=view&id=1NhFmUl0f2QJlxzPjHs-PGPCn2Ugpbdfp" class="w-100 rounded">
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