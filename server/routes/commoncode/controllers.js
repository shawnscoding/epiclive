const database = require('../../services/database.js');
const { getSelectQuery } = require('./query');

module.exports.get = async function(req, res) {
  if (req.headers.codetypes === 'undefined') {
    return res.status(400).json({
      errors: [{ message: 'Bad request', alerttype: 'warning' }],
    });
  }
  const codetypes = JSON.parse(req.headers.codetypes);
  const firstType = codetypes.slice(0, 1);
  const types = codetypes.slice(1);

  let query = getSelectQuery(firstType);
  console.log('query', query);

  if (types.length) {
    for (const value of types) {
      query += `\nOR codetype = ${value}`;
    }
  }

  console.log('second query', query);

  const binds = {};

  const result = await database.simpleExecute(query, binds);

  console.log(result.rows, 'rows');

  if (Array.isArray(result.rows) !== true) {
    throw Error('something wrong in oracle');
  }

  if (result.rows.length) {
    return res.status(200).json(result.rows);
  }
  return res.status(404).json({
    errors: [
      {
        message: 'not found any record',
        alerttype: 'warning',
      },
    ],
  });
};
