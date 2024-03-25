const Funds = require('../models/fundsModel');
const createNum = (base) => Math.trunc(Math.random() * 10 ** base);

const evalToNum = (str) => 1 * str.replace(/[^0-9]/g, '');

exports.addFund = async (req, res, next) => {
  const { amount, purpose } = req.body;

  console.log(req.body);
  const appID =
    7_870_000 + createNum(4) + createNum(3) + createNum(2) + createNum(1);

  await Funds.create({
    amount: evalToNum(amount),
    purpose,
    appID,
  });

  req.appID = appID;
  next();
};

exports.getAppStatus = async (req) => {
  //1) Get and check ID
  let appID = req.params.appID || req.body.appID;
  if (!appID) return;

  //2) Sanitize app ID
  appID = appID.replace(/[^0-9]/, '');

  //3) Get data matched by tracking ID
  const app = await Funds.findOne({ appID: Number(appID) });
  if (!app) return;

  //4) Assign data to request Object
  return app.appStatus;
};
