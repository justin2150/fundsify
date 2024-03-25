const amountEl = document.getElementById('formatted');
const purposeEl = document.getElementById('purpose');

amountEl.addEventListener('input', function (e) {
  const val = e.target.value.replace(/[^0-9]/g, '');

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);

  e.target.value = formatted.replace(/\$/g, '');
});

purposeEl.addEventListener('input', function (e) {
  const val = e.target.value;
  if (val.length < 1) return;
  e.target.value = `${val.slice(0, 1).toUpperCase()}${val.slice(1)}`;
});
