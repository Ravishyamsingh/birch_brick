document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var navToggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  function closeNav() {
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }
  function openNav() {
    mobileNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.contains('is-open');
      if (isOpen) closeNav(); else openNav();
    });
  }
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Search widget (frontend-only: validates, then scrolls to collections)
  var searchWidget = document.getElementById('search-widget');
  var searchNote = document.getElementById('search-note');
  var collectionsNote = document.getElementById('collections-note');
  if (searchWidget) {
    searchWidget.addEventListener('submit', function (e) {
      e.preventDefault();
      var city = document.getElementById('search-city').value;
      var date = document.getElementById('search-date').value;
      if (!city || !date) {
        searchNote.textContent = 'Choose a city and a move-in date to see matching homes.';
        searchNote.classList.add('is-error');
        return;
      }
      searchNote.classList.remove('is-error');
      searchNote.textContent = 'Showing homes available in ' + city + ' from ' + date + '.';
      if (collectionsNote) collectionsNote.textContent = 'Homes available in ' + city;
      document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Testimonial cycler
  var slides = document.querySelectorAll('.testimonial-slide');
  var prevBtn = document.querySelector('.testimonial-prev');
  var nextBtn = document.querySelector('.testimonial-next');
  var current = 0;
  function showSlide(i) {
    slides.forEach(function (el, idx) { el.classList.toggle('is-active', idx === i); });
  }
  if (slides.length) {
    if (prevBtn) prevBtn.addEventListener('click', function () {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      current = (current + 1) % slides.length;
      showSlide(current);
    });
  }

  // Contact form (frontend-only fake submit)
  var contactForm = document.getElementById('contact-form');
  var contactSuccess = document.getElementById('contact-success');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.hidden = true;
      contactSuccess.hidden = false;
    });
  }

  // Newsletter (frontend-only fake subscribe)
  var newsletterForm = document.getElementById('newsletter-form');
  var newsletterMsg = document.getElementById('newsletter-msg');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      newsletterMsg.textContent = "You're on the list — welcome aboard.";
      newsletterForm.reset();
    });
  }

});