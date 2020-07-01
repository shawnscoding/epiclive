const { find } = require('./db_apis.js');
const { filterColumns } = require('../../common/helper');

module.exports.get = async function(req, res) {
  // what to do if there a one row returned
  const result = await find(req);
  // const columns = JSON.parse(req.headers.column_names);
  // const result = filterColumns(columns, rows);
  if (result.rows.length > 0) {
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
