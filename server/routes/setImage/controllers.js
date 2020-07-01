const { create, find, update, deleteInOcl } = require("./db_apis.js");
const { filterColumns } = require("../../common/helper");

module.exports.post = async function (req, res) {
  const result = await create(req.body);

  res.status(200).json(result);
};

module.exports.get = async function (req, res) {
  // what to do if there a one row returned
  const result = await find(req);
  // const columns = JSON.parse(req.headers.column_names);
  // const result = filterColumns(columns, rows);

  if (result.rows.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({
      errors: [
        {
          message: "not found any record",
          alerttype: "warning",
        },
      ],
    });
  }
};

module.exports.deleteRecord = async function (req, res) {
  const context = {};
  context.id = req.params.params;
  const recordId = await deleteInOcl(context);

  res.status(200).json(recordId);
};

module.exports.put = async function (req, res) {
  result = await update(req.body);
  res.status(200).json(result);
};
