/* const jwt = require('jsonwebtoken');
const { User } = require('../models/users');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check json web token exists & is verified
  if (token) {
    jwt.verify(
      token,
      'vbhjwi763892euiyvb9087rfvecbioi20989e13!@',
      (err, decodedToken) => {
        if (err) {
          res.redirect('/login');
        } else {
          next();
        }
      }
    );
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      'vbhjwi763892euiyvb9087rfvecbioi20989e13!@',
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
 */