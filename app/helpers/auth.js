const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../loggers/logger');


//for Generating a token
const generateToken = (req, res, next) => {
  let token = jwt.sign({ email: req.body.email }, config.get('jwtPrivateKey'));
  res.cookie("jwt", token);
  next();
};

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token == undefined) {
      res.redirect('/');
    }

    const verifyUser = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = verifyUser;
    next();
  } catch (err) {
    logger.error(err);

  }
}

module.exports = { generateToken, authenticate };