(function ($) {

  "use strict";

  /* =========================
     MENU COLLAPSE (existing)
  ========================== */
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  /* =========================
     SMOOTH SCROLL (existing)
  ========================== */
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  });

  /* =========================
     ARTIST SLIDER (NEW)
  ========================== */
  $(document).ready(function () {

    const $track = $('.slider-track');
    const $slides = $('.slide');
    const $nextBtn = $('.slider-btn.next');
    const $prevBtn = $('.slider-btn.prev');

    if ($slides.length === 0) return; // safety check

    let index = 0;
    let slideWidth = $slides.outerWidth(true);

    function updateSlider() {
      $track.css('transform', 'translateX(-' + (index * slideWidth) + 'px)');
    }

    $nextBtn.on('click', function () {
      if (index < $slides.length - 1) {
        index++;
        updateSlider();
      }
    });

    $prevBtn.on('click', function () {
      if (index > 0) {
        index--;
        updateSlider();
      }
    });

    /* Auto Slide (optional but nice) */
    setInterval(function () {
      if (index < $slides.length - 1) {
        index++;
      } else {
        index = 0;
      }
      updateSlider();
    }, 4000);

    /* Recalculate on resize */
    $(window).on('resize', function () {
      slideWidth = $slides.outerWidth(true);
      updateSlider();
    });

  });

})(window.jQuery);
