const heroTextEl = document.querySelector('.hero-text');
const heroEl = document.querySelector('.hero');
const heroImg = document.querySelector('.hero-image');

// Vertically align hero text
const getHeight = (el) => el.getBoundingClientRect().height;
heroTextEl.style.setProperty(
  'padding-top',
  `${(getHeight(heroEl) - getHeight(heroTextEl)) / 2}px`
);
// Add display answer on click to element
const questions = document.querySelectorAll('.question');

questions.forEach((el) =>
  el.addEventListener('click', (e) => {
    e.currentTarget.querySelector('span').classList.toggle('active');

    e.currentTarget.nextElementSibling.classList.toggle('active');
  })
);
