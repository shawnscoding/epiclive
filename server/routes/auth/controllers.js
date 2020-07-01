const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const database = require('../../services/database.js');
const { selectQuery } = require('./query.js');
const { login } = require('./../../common/joi');
// @route POST api/auth
// @desc authenticate user and get token
// @access Public

module.exports.login = async (req, res) => {
  const { error } = Joi.validate({ ...req.body }, login);
  if (error) {
    return res.status(400).json({
      errors: [{ message: 'Invalid Credentials', alerttype: 'warning' }],
    });
  }

  const { name, password, workspace_name } = req.body;

  const context = { name, password, workspace_name };
  let query = selectQuery;
  const binds = {};

  binds.password = context.password;
  binds.name = context.name;

  query += `\nWHERE password = :password AND name = :name`;

  const result = await database.simpleExecute(query, binds);

  if (result.rows.length < 1) {
    return res.status(400).json({
      errors: [{ message: 'Invalid Credentials', alerttype: 'warning' }],
    });
  }

  const { user_type, id, workspace_id } = result.rows[0];

  const payload = {
    user: {
      id,
      user_type,
    },
  };
  jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: 86400 },
    (err, token) => {
      if (err) throw Error(err);
      return res.status(200).json({ token, user: { id, workspace_id } });
    }
  );

  // return object
  // return res.status(200).json({ result: result.rows[0] });
};

module.exports.load = async (req, res) => {
  let query = selectQuery;
  query += `\nWHERE id = :id`;

  const binds = {};
  binds.id = req.user.id;

  const result = await database.simpleExecute(query, binds);

  if (result.rows.length < 1) {
    return res.status(400).json({
      errors: [{ message: 'Invalid Credentials', alerttype: 'warning' }],
    });
  }

  const { id, workspace_id } = result.rows[0];

  return res.status(200).json({ user: { id, workspace_id } });
};
