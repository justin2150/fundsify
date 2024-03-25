const bars = document.querySelector('.bars');
const times = document.querySelector('.times');
const closeEl = document.querySelector('.close');
const navEl = document.querySelector('nav');
const moreEl = document.querySelector('li.more');
const moreListings = document.querySelector('nav .more-container');

// Toggling on small devices
if (window.innerWidth < 995) {
  // Function toggles
  const toggles = () => {
    bars.classList.toggle('hide');
    times.classList.toggle('hide');
    navEl.classList.toggle('slide-in');
  };

  // Listen and handle for click events on the bars
  bars.addEventListener('click', () => toggles());

  // Listen and handle for click events on the times
  times.addEventListener('click', () => toggles());
}

if (window.innerWidth > 995) {
  // Function toggles
  const toggles = () => moreListings.classList.toggle('hide');

  // Toggle more links into hidden
  toggles();

  // Listen and handle for hover events on the caret down
  moreEl.addEventListener('mouseenter', () => toggles());
  moreEl.addEventListener('mouseleave', () => toggles());
}
