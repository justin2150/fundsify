const wrapperEl = document.querySelector('.wrapper');
const infoEl = document.querySelectorAll('.card img');
const cardsEl = document.querySelectorAll('.card');

let curStatus = wrapperEl.dataset.curStatus * 1;

// Handle click effect
infoEl.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.currentTarget.nextElementSibling.classList.toggle('show');
  });
});

const createEl = (card) => {
  const el = document.createElement('p');
  el.classList.add('info-text');
  el.textContent = card.querySelector('p.details').textContent;
  return el;
};

// Coloring of status with and display details underneath
const cards = Array.from(cardsEl);

for (let i = 0; i < curStatus; i++) {
  const card = cards.at(i);
  // Fill colors
  card.querySelector('.icon').classList.add('fill');

  if (i !== curStatus - 1) continue;

  // Brighten current status
  card.querySelector('span').classList.add('colored');

  // Display information text
  if (document.documentElement.clientWidth <= 992)
    card.querySelector('.text').append(createEl(card));
  else
    document
      .querySelector('.message')
      .insertAdjacentElement('afterbegin', createEl(card));
}
