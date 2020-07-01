const oracledb = require("oracledb");
const database = require("../../services/database.js");
const { insertQuery, selectQuery } = require("./query");
const { checkSort } = require("../../common/helper");

module.exports.create = async function (obj) {
  // @@ alter
  obj.workspace_id = "WS216863988676954993388743949988460632986";
  // need to query to category to get id with name
  obj.cp_id = "CP221960483869395912540649209338338956013";
  // obj.assetimage_id = "test2";

  // !! do  ASSETIMAGE_ID and url_image, after query to s3
  obj.URL_IMAGE = "test";
  obj.is_delete = 1;
  // obj.lang = obj.Language;

  const record = Object.assign({}, obj);

  console.log("record ----");
  console.log(record, "---------record");

  record.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.STRING,
  };

  const result = await database.simpleExecute(insertQuery, record);
  // createSql = statement,  category = binds
  record.id = result.outBinds.id[0];

  delete record.workspace_id;

  //   returns object
  return record;
};

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
