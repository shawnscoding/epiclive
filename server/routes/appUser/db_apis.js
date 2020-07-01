const oracledb = require("oracledb");
const database = require("../../services/database.js");
const {
  insertQuery,
  selectQuery,
  deleteQuery,
  updateQuery,
  updateQueryWithPassword,
} = require("./query.js");

// @@ have the same order for all queries
// @@ returns object id that came
// @@ write workspace_id statically

// returns object that came
async function create(obj) {
  try {
    obj.workspace_id = "WS216863988676954993388743949988460632986";
    const record = Object.assign({}, obj);
    const avatar_index = Math.random() * 10000000;
    const unixtime = Math.random() * 10000000;

    record.avatar_index = Math.floor(avatar_index);
    record.unixtimeupdateQueryWithPassword = Math.floor(unixtime);
    record.created_by = "admin";

    record.id = {
      dir: oracledb.BIND_OUT,
      type: oracledb.STRING,
    };
    const result = await database.simpleExecute(insertQuery, record);
    // insertQuery = statement,  category = binds
    delete record.workspace_id;
    delete record.avatar_index;
    delete record.unixtime;
    delete record.created_by;
    record.id = result.outBinds.id[0];

    return record;
  } catch (err) {
    console.error(err);
  }
}

module.exports.create = create;

// returns objects from db
async function find(params) {
  let query = selectQuery;
  const binds = {};
  if (params) {
    // params is username here
    query += `\nwhere username like '%${params}%'`;
  }
  const result = await database.simpleExecute(query, binds);
  // !! report
  console.log(result, "result");
  if (Array.isArray(result.rows)) {
    return result.rows;
  } else {
    console.log(result);
  }
}

module.exports.find = find;

// returns id that came
async function deleteInOcl(context) {
  let query = deleteQuery;
  const binds = {};

  if (context.id) {
    binds.id = context.id;

    query += `\nwhere id = :id`;
  }

  const result = await database.simpleExecute(query, binds);

  // !! report
  if (result.lastRowid && result.rowsAffected === 1) {
    result.id = binds.id;

    return result.id;
  } else {
    throw Error("no record has been deleted");
  }
}

module.exports.deleteInOcl = deleteInOcl;

// @@ returns object id that came
// @@ write workspace_id statically

async function update(obj, req) {
  try {
    obj.id = req.params.params;
    //   Object.assign is just copy for checking
    // to prevent direct modification
    const record = Object.assign({}, obj);
    record.updated_by = "admin";
    console.log(record, "record");
    let result;
    if (record.password) {
      result = await database.simpleExecute(updateQueryWithPassword, record);
      console.log("runneeddd!");
    } else {
      result = await database.simpleExecute(updateQuery, record);
    }

    // insertQuery = statement,  category = binds

    // insertQuery = statement,  category = binds
    delete record.updated_by;

    console.log(result, "record");
    if (result.rowsAffected && result.rowsAffected === 1) {
      return record;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports.update = update;
