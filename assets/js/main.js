/* =========================================================================
   ELRVD — shared interactions
   - mobile nav toggle
   - scroll reveal
   - before/after video sliders (supports many per page)
   - play videos only while visible (saves CPU on the gallery)
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- before / after sliders ---------- */
  function wireSlider(slider) {
    var after   = slider.querySelector('.ba-after');
    var divider = slider.querySelector('.ba-divider');
    var handle  = slider.querySelector('.ba-handle');
    var noisy   = slider.querySelector('.ba-noisy');
    if (!after || !noisy) return;

    function setPos(clientX) {
      var r = slider.getBoundingClientRect();
      var pct = ((clientX - r.left) / r.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      var v = pct + '%';
      after.style.setProperty('--pos', v);
      if (divider) divider.style.left = v;
      if (handle) handle.style.left = v;
    }

    var dragging = false;
    function start(e) { dragging = true; setPos((e.touches ? e.touches[0] : e).clientX); }
    function move(e)  { if (dragging) setPos((e.touches ? e.touches[0] : e).clientX); }
    function end()    { dragging = false; }

    slider.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    slider.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('touchend', end);

    // keep the two clips frame-aligned (they share length & fps)
    noisy.addEventListener('timeupdate', function () {
      if (Math.abs(noisy.currentTime - after.currentTime) > 0.08) {
        try { after.currentTime = noisy.currentTime; } catch (err) {}
      }
    });
  }
  document.querySelectorAll('.ba-slider').forEach(wireSlider);

  /* ---------- play videos only while visible ---------- */
  var vids = document.querySelectorAll('video[data-lazyplay]');
  if ('IntersectionObserver' in window && vids.length) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { vio.observe(v); });
  } else {
    vids.forEach(function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
  }
})();
