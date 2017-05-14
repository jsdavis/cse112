const Authmodel = require('../models/Company');
const config = require('../config/config');
const jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  /* Get token from http header */
  const token = req.header('token');
  let email;

    /* If no token in header, we reject request */
  if(!token) {
    return res.sendStatus(401);
  }

    /* Attempt to decoding the token which should give us the admins email */
  try{
    email = jwt.decode(token, config.secret);
  } catch(err) {
    return res.status(401).send('Invalid token');
  }

  Authmodel.findOne({email: email}, (err, user) => {
        // if there are any errors, return the error before anything else
    if(err) {
      return res.status(500).send(err);
    } else if (!user) {
      return res.status(401).send('Invalid token');
    } else {
      next();
    }
  });
};
