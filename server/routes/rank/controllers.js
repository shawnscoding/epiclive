const database = require("../../services/database.js");
const { checkDate, checkParams, mapRecords } = require("../../common/helper");

const selectQuery = `SELECT content_id name,
count(*) count,
max(created) last_watch
from view_details
where LOGFLAG = 1`;

const find = async (req, res) => {
  const params = req.params.params;

  let query = selectQuery;

  let addedQuery = checkDate(req, query);
  if (!addedQuery) {
    return res.status(400).json({
      errors: [
        {
          msg: "Bad Request !",
        },
      ],
    });
  }

  //   const filteredRes_1 = checkParams(req, query)

  addedQuery += `\nGROUP BY content_id \nORDER BY count desc`;

  //   query_after_update stands for sorting
  //   const query_after_update = checkSort(req, query);

  const binds = {};
  const result = await database.simpleExecute(addedQuery, binds);
  if (Array.isArray(result.rows)) {
    return result.rows;
  } else {
    throw Error("something wrong in oracle");
  }
};

module.exports.get = async function (req, res) {
  rows = await find(req, res);
  if (rows.statusCode === 400) {
    return;
  }

  const result = mapRecords(rows);

  if (result.length > 0) {
    res.status(200).json(result);
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
