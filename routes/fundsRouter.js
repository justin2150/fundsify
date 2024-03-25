const router = require('express').Router();
const fundsController = require('../controller/fundsController');

// Register Page
router.get('/', async (req, res) => {
  res.render('apply', {
    title: 'Fundsify - Get started',
    css: 'apply',
  });
});

router.post('/apply', fundsController.addFund, (req, res) => {
  res.render('apply-success', {
    title: 'Fundsify - Registration Successful',
    appID: req.appID,
  });
});

// Track Application Status
router.all('/status/:appID?', async (req, res) => {
  // Get request with no appID
  if (req.method === 'GET' && !req.params.appID)
    return res.render('form', { title: 'Fundsify - Enter Tracking ID' });

  // Get App Status
  const appStatus = await fundsController.getAppStatus(req);

  // Check app Status and render
  if (!appStatus)
    res.render('form', {
      title: 'Fundsify - Enter Tracking ID',
      error: 'Invalid tracking ID',
    });
  else
    res.render('status', {
      title: 'Fundsify - Application Status',
      appStatus: appStatus,
    });
});

module.exports = router;
