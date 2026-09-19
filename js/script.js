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

  var MONTHLY_DISCOUNT = 0.05;
  var DEFAULT_FACILITIES = ['AC Available', 'Wi-Fi Available', 'Mini Fridge', 'Room Service', 'Laundry'];
  var PROPERTIES = [
    {
      unit: 'Unit 01', type: '1 RK',
      images: ['1RK_bathroom.jpg', '1RK_bedroom.jpg', '1RK_dining_area.jpg', '1RK_kitchen.jpg'],
      rooms: ['1 Room', '1 Kitchen', '1 Drawing Room', '1 Bathroom'], capacity: '2 Persons', daily: 2200
    },
    {
      unit: 'Unit 02', type: '2 RK',
      images: ['1RK_bedroom.jpg', '1RK_kitchen.jpg', '2RK_bedrooms.jpg', '2RKK_Drawingrooms.jpg', 'bathroom.jpeg', 'Comman_parking_area.jpg'],
      rooms: ['2 Rooms', '1 Kitchen', '1 Drawing Room', '1 Bathroom', '1 Balcony'], capacity: '4 Persons', daily: 4400
    },
    {
      unit: 'Unit 03', type: '1 BHK',
      images: ['1BHK_bedroom.jpg', '1BHK_dining_area.jpg', '1BHK_Kitchen.jpg', '2BHK_bathroom_full.jpg', '2BHK_Drawingrooms.jpg', '4BHK_KITchen.jpg'],
      rooms: ['1 Bedroom', '1 Drawing Room', '1 Kitchen', '1 Bathroom'], capacity: '2 Persons', daily: 2400
    },
    {
      unit: 'Unit 04', type: '2 BHK',
      images: ['2BHK__bedroom.jpeg', '2BHK_bathroom_full.jpg', '2BHK_bathroom.jpg', '2BHK_bedroom.jpg', '2BHK_Drawingroom.jpg', '2BhK_Kitchen.jpg'],
      rooms: ['2 Bedrooms', '1 Drawing Room / Hall', '1 Kitchen', '2 Bathrooms', '1 Party Terrace'], capacity: '4 Persons', daily: 4800
    },
    {
      unit: 'Unit 05', type: '4 BHK',
      images: ['1RK_bedroom.jpg', '2BHK_bedroom.jpg', '2BHK_bedrooms.jpg', '4BHK_bedroomsss.jpg', '4BHK_Drawing_Room.jpg', '4BHK_KITchen.jpg', '4RK_bathroom.jpg', 'bathroom.jpeg'],
      rooms: ['4 Rooms', '1 Kitchen', '1 Drawing Room', '2 Bathrooms', '1 Balcony', '1 Party Terrace'], capacity: '8 Persons', daily: 8500
    },
    {
      unit: 'Unit 06', type: '6 Room Set',
      images: ['Terrace.jpg', '6_BHK_bedroom.jpg', '6bhk_terrace room2.jpg', '6bhk_terrace room.jpg', '6bhk_terrace kitchen.jpg', '6BHK_Drawingrooms.jpg', '6BHK_bedroomsss.jpg', '6BHK_bedroom.jpg', '6BHK_bathroom_full.jpg', '6BHKBED.jpeg'],
      rooms: ['6 Rooms', '2 Kitchens', '2 Bathrooms', '1 Balcony', '1 Party Terrace'], capacity: '12 Persons', daily: 13300
    }
  ];

  function formatINR(value) {
    return '₹' + value.toLocaleString('en-IN');
  }

  function propertyCardHTML(property, cardIndex) {
    var photos = property.images.map(function (imageName, photoIndex) {
      var unitNumber = parseInt(property.unit.replace(/\D/g, ''), 10);
      var imagePath = 'images/units/unit-' + unitNumber + '/' + encodeURIComponent(imageName);
      return '<div class="property-photo"><img class="photo-art" src="' + imagePath + '" alt="' + property.type + ' ' + property.unit + ' view ' + (photoIndex + 1) + '" loading="lazy" decoding="async"></div>';
    }).join('');
    var details = property.rooms.map(function (detail) {
      return '<li>' + detail + '</li>';
    }).join('');
    var facilities = (property.facilities || DEFAULT_FACILITIES).map(function (facility) {
      return '<span class="amenity-chip">' + facility + '</span>';
    }).join('');

    var monthlyBeforeDiscount = property.daily * 30;
    var monthlyPrice = monthlyBeforeDiscount * (1 - MONTHLY_DISCOUNT);

    return '<article class="collection-card property-card" data-reveal style="--card-order:' + cardIndex + '">' +
      '<div class="property-gallery gallery-count-' + property.images.length + '" aria-label="' + property.images.length + ' images of ' + property.type + ' ' + property.unit + '">' + photos + '<span class="photo-count">' + property.images.length + ' photos</span></div>' +
      '<div class="collection-body">' +
        '<div class="property-heading"><div><span class="unit-number">' + property.unit + '</span><h3>' + property.type + '</h3></div><span class="offer-badge">5% off monthly</span></div>' +
        '<p class="property-location"><span aria-hidden="true">⌖</span> Gurugram Sector 43</p>' +
        '<ul class="room-details">' + details + '</ul>' +
        '<p class="capacity"><strong>Maximum Capacity:</strong> ' + property.capacity + '</p>' +
        '<div class="property-amenities" aria-label="Available facilities">' + facilities + '</div>' +
        '<div class="price-block"><span class="price-label">Price per day</span><div class="property-price">' + formatINR(property.daily) + '<span>/ day</span></div><div class="monthly-heading">Monthly stay · 30 days</div><div class="monthly-price"><span class="monthly-original">' + formatINR(monthlyBeforeDiscount) + '</span><strong>' + formatINR(monthlyPrice) + ' / month</strong></div><div class="monthly-note">Includes 5% monthly booking discount</div></div>' +
      '</div>' +
      '</article>';
  }

  var propertyGrid = document.getElementById('property-grid');
  if (propertyGrid) {
    propertyGrid.innerHTML = PROPERTIES.map(propertyCardHTML).join('');
    propertyGrid.querySelectorAll('[data-reveal]').forEach(observeReveal);
  }
});
