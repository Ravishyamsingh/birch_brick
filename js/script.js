document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var navToggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  function closeNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', isOpen);
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeNav();
  });

  var supportsIO = 'IntersectionObserver' in window;
  var io = supportsIO ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;
  function observeReveal(element) {
    if (supportsIO) io.observe(element);
    else element.classList.add('is-visible');
  }
  document.querySelectorAll('[data-reveal]').forEach(observeReveal);

  var PROPERTIES = [
    { unit: 'Unit 01', type: '1 RK', rooms: ['1 Room', '1 Kitchen', '1 Drawing Room', '1 Bathroom'], capacity: '2 Persons', facilities: ['AC Available', 'Wi-Fi Available', 'Mini Fridge', 'Room Service', 'Laundry'], offer: '10% off', daily: 2944, monthly: 88320 },
    { unit: 'Unit 02', type: '2 RK', rooms: ['2 Rooms', '1 Kitchen', '1 Drawing Room', '1 Bathroom',  '1 Balcony'], capacity: '4 Persons', facilities: ['AC Available', 'Wi-Fi Available', 'Mini Fridge', 'Room Service', 'Laundry'], offer: '10% off', daily: 3999, monthly: 119970 },
    { unit: 'Unit 03', type: '1 BHK', rooms: ['1 Bedroom', '1 Drawing Room', '1 Kitchen', '1 Bathroom'], capacity: '2 Persons', facilities: ['AC Available', 'Wi-Fi Available', 'Mini Fridge', 'Room Service', 'Laundry'], offer: '10% off', daily: 3499, monthly: 104970 },
    { unit: 'Unit 04', type: '2 BHK', rooms: ['2 Bedrooms', '1 Drawing Room / Hall', '1 Kitchen', '1 Bathroom', '1 Party Terrace'], capacity: '4 Persons', facilities: ['AC Available', 'Wi-Fi Available', 'Mini Fridge', 'Room Service', 'Laundry'], offer: '15% off', daily: 4999, monthly: 149970 },
    { unit: 'Unit 05', type: '4 BHK', rooms: ['4 Rooms', '1 Kitchen', '1 Drawing Room', '2 Bathrooms', '1 Balcony', '1 Party Terrace'], capacity: '8 Persons', facilities: ['AC Available', 'Wi-Fi Available', 'Mini Fridge', 'Room Service', 'Laundry'], offer: '12% off', daily: 6499, monthly: 194970 },
    { unit: 'Unit 06', type: '6-Room Set', rooms: ['6 Rooms', '2 Kitchens', '2 Bathrooms',  '1 Balcony', '1 Party Terrace'], capacity: '12 Persons', facilities: ['AC Available', 'Wi-Fi Available', 'Mini Fridge', 'Room Service', 'Laundry'], offer: '20% off', daily: 8999, monthly: 269970 },
    
  ];

  function formatINR(value) {
    return '₹' + value.toLocaleString('en-IN');
  }

  function propertyCardHTML(property, cardIndex) {
    var photos = [0, 1, 2, 3].map(function (photoIndex) {
      var unitNumber = parseInt(property.unit.replace(/\D/g, ''), 10);
      var imagePath = 'images/units/unit-' + unitNumber + '/image-' + (photoIndex + 1) + '.jpg';
      return '<div class="property-photo"><img class="photo-art" src="' + imagePath + '" alt="' + property.type + ' ' + property.unit + ' image ' + (photoIndex + 1) + '" loading="lazy"></div>';
    }).join('');
    var details = property.rooms.map(function (detail) {
      return '<li>' + detail + '</li>';
    }).join('');
    var facilities = property.facilities.map(function (facility) {
      return '<span class="amenity-chip">' + facility + '</span>';
    }).join('');

    return '<article class="collection-card property-card" data-reveal style="--card-order:' + cardIndex + '">' +
      '<div class="property-gallery" aria-label="Four images of ' + property.type + ' ' + property.unit + '">' + photos + '</div>' +
      '<div class="collection-body">' +
        '<div class="property-heading"><div><span class="unit-number">' + property.unit + '</span><h3>' + property.type + '</h3></div><span class="offer-badge">' + property.offer + '</span></div>' +
        '<p class="property-location"><span aria-hidden="true">⌖</span> Gurugram Sector 43</p>' +
        '<ul class="room-details">' + details + '</ul>' +
        '<p class="capacity"><strong>Maximum Capacity:</strong> ' + property.capacity + '</p>' +
        '<div class="property-amenities" aria-label="Available facilities">' + facilities + '</div>' +
        '<div class="price-block"><span class="price-label">Price per day</span><div class="property-price">' + formatINR(property.daily) + '<span>/ day</span></div><div class="monthly-price">' + formatINR(property.monthly) + ' / month</div></div>' +
      '</div>' +
    '</article>';
  }

  var propertyGrid = document.getElementById('property-grid');
  if (propertyGrid) {
    propertyGrid.innerHTML = PROPERTIES.map(propertyCardHTML).join('');
    propertyGrid.querySelectorAll('[data-reveal]').forEach(observeReveal);
  }
});
