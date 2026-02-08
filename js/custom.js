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
/* =========================
   COUNTDOWN TIMER
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const targetDate = new Date("2027-02-11T06:00:00").getTime();

  const timeElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    seconds: document.getElementById("seconds")
  };

  function flip(element, newValue) {
    if (!element || element.textContent === newValue) return;

    element.classList.add("flip");

    setTimeout(() => {
      element.textContent = newValue;
      element.classList.remove("flip");
    }, 400);
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      flip(timeElements.days, "00");
      flip(timeElements.hours, "00");
      flip(timeElements.seconds, "00");
      clearInterval(timer);
      return;
    }

    const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
    const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, "0");

    flip(timeElements.days, days);
    flip(timeElements.hours, hours);
    flip(timeElements.seconds, seconds);
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

});