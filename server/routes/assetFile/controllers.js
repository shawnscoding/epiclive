const database = require('../../services/database.js');
const { selectQuery } = require('./query');

module.exports.get = async function(req, res) {
  const { params } = req.params;

  let query = selectQuery;

  const binds = {};
  if (params !== undefined) {
    // param is title here
    query += `\nWHERE title like '%${params}%'`;
  }

  const result = await database.simpleExecute(query, binds);

  console.log(result, 'rows');

  if (Array.isArray(result.rows) !== true) {
    throw Error('something wrong in oracle');
  }

  if (result.rows.length) {
    return res.status(200).json(result);
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
