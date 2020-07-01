const oracledb = require("oracledb");
const database = require("../../services/database.js");
const {
  insertQuery,
  selectQuery,
  deleteQuery,
  updateQuery,
} = require("./query");
const { checkSort } = require("../../common/helper");

module.exports.create = async function (obj) {
  const record = Object.assign({}, obj);
  console.log("0000000record");
  console.log(record);

  record.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.STRING,
  };

  const result = await database.simpleExecute(insertQuery, record);
  // createSql = statement,  category = binds

  if (result.rowsAffected < 1) {
    throw Error("something wrong");
  }

  console.log("0-----------success--------result");
  console.log(result);

  record.id = result.outBinds.id[0];

  return record;
};

// returns objects from db
// !! fix NaN in query

module.exports.find = async function (req) {
  const params = req.params.params;

  let query = selectQuery;

  const binds = {};
  if (params !== undefined) {
    // param is title here
    query += `\nWHERE title like '%${params}%'`;
  }

  let sort;
  let result;

  if (req.headers.sort === "undefined") {
    result = await database.simpleExecute(query, binds);
  } else {
    const { column, direction } = JSON.parse(req.headers.sort);

    const query_after_sort = checkSort(column, direction, query);
    sort = { column, direction };
    result = await database.simpleExecute(query_after_sort, binds);
  }

  result.servedSort = sort;

  if (Array.isArray(result.rows)) {
    return result;
  } else {
    throw Error("something wrong in oracle");
  }
};

// returns id that came

module.exports.deleteInOcl = async function (context) {
  const binds = {};

  if (context.id === undefined) {
    return res.status(400).json({
      errors: [{ message: "Bad request", alerttype: "warning" }],
    });
  }

  binds.id = context.id;

  const result = await database.simpleExecute(deleteQuery, binds);

  console.log(result, "result");

  // !! report
  if (result.lastRowid && result.rowsAffected === 1) {
    result.id = binds.id;

    return result.id;
  } else {
    throw Error("delete failed");
  }
};

// returns object that came
// @@ alter

//

module.exports.update = async function (obj) {
  //   Object.assign is just copy for checking
  // to prevent direct modification
  const record = Object.assign({}, obj);

  const result = await database.simpleExecute(updateQuery, record);
  // createSql = statement,  category = binds

  if (result.rowsAffected && result.rowsAffected === 1) {
    return record;
  } else {
    throw Error("update faliled");
  }
};
