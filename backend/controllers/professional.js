const getData = async (req, res, next) => {
  const data = require('../user.json')[0];
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
};

module.exports = { getData };
