// const labelEl = document.querySelector('label');
const inputEl = document.querySelector('input');
const erroEl = document.querySelector('p.error');

inputEl.addEventListener('click', (e) => {
  e.currentTarget.previousElementSibling.classList.add('focus');
  erroEl.textContent = '';
});

inputEl.addEventListener('blur', (e) => {
  let { value } = e.target;
  // Return label when empty
  if (!value) e.currentTarget.previousElementSibling.classList.remove('focus');

  // Display length error for tracking code
  if (value.length < 7 && value)
    erroEl.textContent = 'Tracking can only be seven numbers';

  // Visually format tracking code
  if (value.length === 7)
    e.target.value = `${value.slice(0, 3)}-${value.slice(-4)}`;
});
