const router = require('express').Router();

const { getSponsors, getAllFaqs } = require('../controller/appData');

router.get('/', async (_, res) => {
  const sponsors = getSponsors();
  const faqs = getAllFaqs();
  res.render('index', {
    title: 'Fundsify - main',
    irsystem: '/apply',
    css: 'index',
    faqs,
    sponsors,
  });
});

// About us
router.get('/about', async (_, res) => {
  res.render('about', {
    title: 'Fundsify - about us',
    irsystem: '/apply',
    css: 'about',
  });
});

//Privacy Policy
router.get('/privacy', async (_, res) => {
  res.render('privacy', {
    title: 'Fundsify - Privacy Policy',
    irsystem: '/apply',
    css: 'privacy',
  });
});

module.exports = router;
