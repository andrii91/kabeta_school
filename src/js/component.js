$(document).ready(function () {
  $('.scroll').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 60
    }, 1500);

  });
  $(window).scroll(function () {
    return $('nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });

  var methodsSlider = $('.methods-carousel');

  methodsSlider.owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    navText: false,
    margin: 0,
    //    autoHeight:true,
    responsive: {
      0: {
        items: 1,
         dots: true,
      },
      1200: {
        items: 1,
         dots: false,
      }
    }
  });


  methodsSlider.on('changed.owl.carousel', function (event) {
    var index = event.item.index;
    if (index == 1) {
      index = event.item.count + 1;
    }
    $('.methods-all').text('0' + event.item.count);
    $('.methods-cur').text('0' + (index - 1));
  });

  $('.methods-next').click(function () {
    methodsSlider.trigger('next.owl.carousel');
  });

  $('.methods-prev').click(function () {
    methodsSlider.trigger('prev.owl.carousel');
  });

  $('.methods-more').click(function () {
    $($(this).parent().find('.methods-content p>span')).slideToggle(400);
  })

  var teamSlider = $('.team-carousel');

  teamSlider.owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    navText: false,
    margin: 0,
    //    autoHeight:true,
    responsive: {
      0: {
        items: 1,
         dots: true,
      },
      600: {
        items: 2,
        margin: 10,
        dots: true,
      },
      1000: {
        items: 4,
         dots: false,
      }
    }
  });


  teamSlider.on('changed.owl.carousel', function (event) {
    var index = event.item.index;
    if (index == 3) {
      index = event.item.count + 3;
    }
    $('.team-all').text('0' + event.item.count);
    $('.team-cur').text('0' + (index - 3));
  });

  $('.team-next').click(function () {
    teamSlider.trigger('next.owl.carousel');
  });

  $('.team-prev').click(function () {
    teamSlider.trigger('prev.owl.carousel');
  });

  $('.team-more').click(function () {
    $($(this).parent().find('.more')).slideToggle(400);
  })




});

$(document).ready(function () {
  $("input[type='tel']").mask("+38 (999) 999-9999");

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });
    return vars;
  }
  $('input[name="utm_source"]').val(getUrlVars()["utm_source"]);
  $('input[name="utm_campaign"]').val(getUrlVars()["utm_campaign"]);
  $('input[name="utm_medium"]').val(getUrlVars()["utm_medium"]);
  $('input[name="utm_term"]').val(getUrlVars()["utm_term"]);
  $('input[name="utm_content"]').val(getUrlVars()["utm_content"]);
  $('input[name="click_id"]').val(getUrlVars()["aff_sub"]);
  $('input[name="affiliate_id"]').val(getUrlVars()["aff_id"]);
  $('input[name="user_agent"]').val(navigator.userAgent);
  $('input[name="ref"]').val(document.referrer);

  $.get("https://ipinfo.io", function (response) {
    $('input[name="ip_address"]').val(response.ip);
    $('input[name="city"]').val(response.city);
  }, "jsonp");

  function readCookie(name) {
    var n = name + "=";
    var cookie = document.cookie.split(';');
    for (var i = 0; i < cookie.length; i++) {
      var c = cookie[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(n) == 0) {
        return c.substring(n.length, c.length);
      }
    }
    return null;
  }
  setTimeout(function () {
    $('.gclid_field').val(readCookie('gclid'));
    if ($('.gclid_field').val() == '') {
      $('.gclid_field').val(readCookie('_gid'));
    }
  }, 2000);

  /*db/registration.php*/

  /* form valid*/
  var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';
  var error;
  $('.submit').click(function (e) {
    e.preventDefault();
    var ref = $(this).closest('form').find('[required]');
    $(ref).each(function () {
      if ($(this).val() == '') {
        var errorfield = $(this);
        if ($(this).attr("type") == 'email') {
          var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
          if (!pattern.test($(this).val())) {
            $("input[name=email]").val('');
            $(this).addClass('error').parent('span').append('<div class="allert"><p>Укажите коректный e-mail</p>' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
          }
        } else if ($(this).attr("type") == 'tel') {
          var patterntel = /^()[- +()0-9]{9,18}/i;
          if (!patterntel.test($(this).val())) {
            $("input[name=phone]").val('');
            $(this).addClass('error').parent('span').append('<div class="allert"><p>Укажите номер телефона в формате +3809999999</p>' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
          }
        } else {
          $(this).addClass('error').parent('span').append('<div class="allert"><p>Заполните это поле</p>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
        }
        return;
      } else {
        error = 0;
        $(this).addClass('error').parent('span').find('.allert').remove();
      }
    });
    if (error !== 1) {
      $(this).unbind('submit').submit();
    }
  });

  /*end form valid*/

  $('form').on('submit', function (e) {
    e.preventDefault();
    $('.submit').addClass('inactive');
    $('.submit').prop('disabled', true);
    var $form = $(this);
    var $data = $form.find('input');



    $.ajax({
      type: 'POST',
      url: 'db/registration.php',
      dataType: 'json',
      data: $form.serialize(),
      success: function (response) {}
    });

    setTimeout(function () {
      window.location.href = "success.html";
    }, 800);

  });



  $('#nav-icon').click(function () {
    $(this).toggleClass('open');
    $(this).parents('nav').toggleClass('open');
    $('.menu').slideToggle(200);
  });
  
  if($(window).width() < 1200){
    $('.teach-mob_carousel').addClass('owl-carousel owl-theme');
    $('.teach-mob_carousel').owlCarousel({
      loop: true,
      nav: true,
      dots: true,
      navText: false,
      margin: 0,
          autoHeight:true,
      responsive: {
        0: {
          items: 1,
        }
      }
    });
    
    $('.owl-prev').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 10"><g data-name="Слой 2"><path d="M.22 4.5L4.74.2a.77.77 0 0 1 1 0 .68.68 0 0 1 0 1L1.78 5l4 3.8a.68.68 0 0 1 0 1 .76.76 0 0 1-1 0L.22 5.49a.68.68 0 0 1 0-1z" data-name="Слой 1"></path></g></svg>')
    $('.owl-next').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 10"><g data-name="Слой 2"><path d="M5.79 5.5L1.26 9.79a.77.77 0 0 1-1 0 .68.68 0 0 1 0-1l4-3.8-4-3.8a.68.68 0 0 1 0-1 .76.76 0 0 1 1 0L5.79 4.5a.68.68 0 0 1 0 1z" data-name="Слой 1"></path></g></svg>')
    
  }

});