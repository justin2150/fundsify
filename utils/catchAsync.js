// Arrow equivalent on line 8
module.exports = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

// module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);
