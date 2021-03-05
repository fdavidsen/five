$.ajax({
  url: 'json/biography.json',
  method: 'GET',
  dataType: 'JSON',
  success: function(result) {
    let content = '';
    result.forEach(item => {
      let birthday = (item.birthday !== undefined) ? `<p class="mb-1"><i class="fas fa-birthday-cake me-2"></i>${ item.birthday }</p>` : '';     
      let email = (item.email !== undefined) ? `<p class="mb-1"><i class="far fa-envelope me-2"></i>${ item.email }</p>` : '';
      let zodiac = (item.zodiac !== undefined) ? `<p class="mb-1"><i class="far fa-star me-2"></i>${ item.zodiac }</p>` : '';
      let hobby = (item.hobby !== undefined) ? `<p class="mb-1"><i class="far fa-heart me-2"></i>${ item.hobby }</p>` : '';
      let joke = (item.joke !== undefined) ? `<p class="mb-1"><i class="far fa-grin-tongue-squint me-2"></i>${ item.joke }</p>` : '';
      let instagram = (item.instagram !== undefined) ?
        `<p class="mb-1">
          <i class="fab fa-instagram me-2"></i>
          <a href="https://www.instagram.com/${ item.instagram }/" target="_blank">
            ${ item.instagram }
          </a>
        </p>` : '';
      let quote = (item.quote !== undefined) ?
        `<div class="card-footer bg-dark text-center border-top-0 py-2">
          <sup><small><i class="fas fa-quote-left text-muted"></i></small></sup>
          <blockquote class="fst-italic my-0">
            ${ item.quote }
          </blockquote>
          <sup><small><i class="fas fa-quote-right text-muted"></i></small></sup>
        </div>`: '';
      
      content += `
        <div class="col-md-6 col-xxl-4">
          <div class="card border-0 shadow mb-5">
            <div class="card-header bg-dark text-center border-bottom-0 py-3">
              <h6 class="card-title text-white fw-bold mb-0">${ item.name }</h6>
            </div>
            <div class="card rounded-bottom rounded-0 border-0">
              <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center p-3 pb-1">
                  <div class="card-img">
                    <img alt="${ item.name }" src="https://drive.google.com/uc?export=view&id=1NhFmUl0f2QJlxzPjHs-PGPCn2Ugpbdfp" class="w-100 rounded">
                  </div>
                </div>
                <div class="col-md-8 text-center">
                  <div class="card-body d-inline-block text-start">
                    ${ birthday }
                    ${ instagram }
                    ${ email }
                    ${ zodiac }
                    ${ hobby }
                    ${ joke }                 
                  </div>
                </div>
              </div>
            </div>
            ${ quote }
          </div>
        </div>
      `;
    });
    $('#member .row').html(content);
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
  const section = $(this).data('section');

  $('section#' + section).addClass('active').siblings('section').removeClass('active');
  $('title').html('FIVE - ' + menuName[section]);
  
  if (section === 'home') {
    $('.btn-home').css('display', 'none')
  } else {
    $('.btn-home').css('display', 'inline');
  }
});