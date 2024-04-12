const fs = require('fs');
const catchAsync = require('../utils/catchAsync');

const { faqs } = JSON.parse(fs.readFileSync(`${__dirname}/../data/faqs.json`));

const getStates = (country) =>
  JSON.parse(fs.readFileSync(`${__dirname}/../data/${country}-states.json`));

exports.getSponsors = () => {
  let sponsors = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/sponsors.json`, 'utf-8')
  );
  ({ sponsors } = sponsors);
  sponsors = sponsors.filter((_, i) => i < 18);
  return sponsors;
};

exports.getAllFaqs = () => faqs;
