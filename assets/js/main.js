/* Tiny Purple Cat: small, dependency-free enhancements.
   Everything works without this file: the trailer poster is a link to YouTube,
   screenshots are links to the full image, clips show native controls, and the
   mobile CTA bar stays hidden. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;

  /* ---- Trailer: nothing is requested from YouTube until the click ---- */
  document.querySelectorAll('[data-youtube-id]').forEach(function (box) {
    var link = box.querySelector('.trailer-poster');
    if (!link) return;
    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' +
        encodeURIComponent(box.getAttribute('data-youtube-id')) + '?autoplay=1&rel=0';
      frame.title = box.getAttribute('data-title') || 'Trailer';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      link.replaceWith(frame);
      frame.focus();
    });
  });

  /* ---- Clips: hover/focus on desktop, tap on touch ---- */
  document.querySelectorAll('video.clip').forEach(function (v) {
    v.removeAttribute('controls');
    v.tabIndex = 0;
    v.setAttribute('role', 'button');
    function play() { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    function stop() { v.pause(); }
    function toggle() { if (v.paused) play(); else stop(); }
    if (canHover && !reduceMotion) {
      v.addEventListener('mouseenter', play);
      v.addEventListener('mouseleave', stop);
      v.addEventListener('focus', play);
      v.addEventListener('blur', stop);
    }
    v.addEventListener('click', toggle);
    v.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  /* ---- Lightbox (native <dialog>: Esc, focus trap and inert page come built in) ---- */
  var dlg = document.querySelector('dialog.lightbox');
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('a[data-lightbox]'));
  if (dlg && typeof dlg.showModal === 'function' && thumbs.length) {
    var img = dlg.querySelector('.lb-figure img');
    var count = dlg.querySelector('.lb-count');
    var current = 0;
    var opener = null;

    function show(i) {
      current = (i + thumbs.length) % thumbs.length;
      var a = thumbs[current];
      img.src = a.href;
      img.alt = a.querySelector('img').alt;
      count.textContent = (current + 1) + ' of ' + thumbs.length;
    }
    function open(i, from) {
      opener = from;
      show(i);
      dlg.showModal();
    }
    thumbs.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        open(i, a);
      });
    });
    dlg.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    dlg.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () {
      img.removeAttribute('src');
      if (opener) opener.focus();
    });
  }

  /* ---- Mobile sticky CTA bar ---- */
  var bar = document.getElementById('mobile-cta-bar');
  var hero = document.getElementById('hero-cta');
  var band = document.getElementById('cta-band');
  if (bar && hero && 'IntersectionObserver' in window) {
    var heroGone = false;
    var bandVisible = false;
    var update = function () { bar.hidden = !(heroGone && !bandVisible); };
    document.documentElement.classList.add('has-cta-bar');
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        heroGone = !e.isIntersecting && e.boundingClientRect.top < 0;
      });
      update();
    }).observe(hero);
    if (band) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { bandVisible = e.isIntersecting; });
        update();
      }).observe(band);
    }
  }
})();
