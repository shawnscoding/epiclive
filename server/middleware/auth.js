const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const { token } = req.params;
  console.log('token oin middleware');
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, authorization denied' }] });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Token is not valied' }] });
  }
};
