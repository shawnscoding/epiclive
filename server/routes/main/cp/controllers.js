const oracledb = require('oracledb');
const Joi = require('joi');
const database = require('../../../services/database.js');
const { checkSort } = require('../../../common/helper');
const {
  deleteQuery,
  updateQuery,
  insertQuery,
  selectQuery,
  selectTotalLengthQuery,
} = require('./query.js');
const {
  insertValidator,
  updateValidator,
  deleteValidator,
} = require('./validator.js');

const handleFilterCNs = (query, columnNames) => {
  let addedQuery = query;
  for (let i = 0; i < columnNames.length; i += 1) {
    addedQuery += `\n${columnNames[i]} "${columnNames[i]}",`;
  }

  return addedQuery;
};

const handleSort = (query, sort) => {
  let resQuery;

  if (!sort.type) {
    const { column, direction } = sort;

    resQuery = checkSort(column, direction, query);
  } else {
    throw Error('something went wrong with sorting');
  }

  return resQuery;
};

const handleSearching = (query, searchBy) => {
  let resQuery = query;
  resQuery += `\nFROM cp`;

  if (searchBy === undefined) {
    resQuery += `\nWHERE title like '% %')`;
  } else {
    resQuery += `\nWHERE title like '%${searchBy}%')`;
  }

  return resQuery;
};

const handlePaginate = (query, lastrecord) => {
  let resQuery = query;

  resQuery += `\nWHERE R >= 1`;
  resQuery += `\nAND R <= ${lastrecord}`;

  return resQuery;
};

module.exports.get = async function(req, res) {
  const { params: searchBy } = req.params;

  const sortBy = JSON.parse(req.headers.sort);
  const columnNames = JSON.parse(req.headers.column_names);
  const lastrecord = JSON.parse(req.headers.lastrecord);
  console.log(' params, sortBy, columnNames, lastrecord');
  console.log(sortBy, columnNames, lastrecord);

  const query = selectQuery;

  const queryAfterFilter = handleFilterCNs(query, columnNames);

  const queryAfterSort = handleSort(queryAfterFilter, sortBy);
  const queryAfterSearch = handleSearching(queryAfterSort, searchBy);
  const queryAfterPaginate = handlePaginate(queryAfterSearch, lastrecord);

  const binds = {};

  const result = await database.simpleExecute(queryAfterPaginate, binds);
  const total = await database.simpleExecute(selectTotalLengthQuery, binds);

  if (Array.isArray(result.rows) === false) {
    return res.status(500).json({
      errors: [
        {
          message: 'something went wrong',
          alerttype: 'warning',
        },
      ],
    });
  }
  if (!result.rows.length) {
    return res.status(404).json({
      errors: [
        {
          message: 'Not found any record',
          alerttype: 'warning',
        },
      ],
    });
  }

  const totalLength = total.rows[0]['COUNT(*)'];

  result.totalLength = totalLength;

  return res.status(200).json(result);
};

module.exports.post = async function(req, res) {
  const { error } = Joi.validate({ ...req.body }, insertValidator);
  if (error) {
    return res.status(400).json({
      errors: [{ message: error.details[0].message, alerttype: 'warning' }],
    });
  }
  const record = { ...req.body };

  // @@ alter
  record.workspace_id = 'WS216863988676954993388743949988460632986';

  record.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.STRING,
  };

  const result = await database.simpleExecute(insertQuery, record);
  // createSql = statement,  category = binds
  const id = result.outBinds.id[0];
  record.id = id;

  delete record.workspace_id;

  if (result.rowsAffected === 1) {
    res.status(200).json(record);
  } else {
    res.status(404).json({
      errors: [
        {
          message: 'could not affect the record',
          alerttype: 'warning',
        },
      ],
    });
  }
};

module.exports.deleteRecord = async function(req, res) {
  const { params } = req.params;

  const { error } = Joi.validate({ id: params }, deleteValidator);
  if (error) {
    return res.status(400).json({
      errors: [{ message: error.details[0].message, alerttype: 'warning' }],
    });
  }

  const result = await database.simpleExecute(deleteQuery, { id: params });

  // !! report
  if (result.rowsAffected === 1) {
    result.id = params;

    res.status(200).json(result.id);
  } else {
    res.status(404).json({
      errors: [
        {
          message: 'not found any record',
          alerttype: 'warning',
        },
      ],
    });
  }
};

module.exports.put = async function(req, res) {
  const { params } = req.params;

  const { error } = Joi.validate({ ...req.body, id: params }, updateValidator);
  if (error) {
    return res.status(400).json({
      errors: [{ message: error.details[0].message, alerttype: 'warning' }],
    });
  }

  const record = { ...req.body, id: params };

  record.workspace_id = 'WS216863988676954993388743949988460632986';

  const result = await database.simpleExecute(updateQuery, record);
  // createSql = statement,  category = binds

  delete record.workspace_id;

  if (result.rowsAffected && result.rowsAffected === 1) {
    res.status(200).json(record);
  } else {
    res.status(404).json({
      errors: [
        {
          message: 'not found any record',
          alerttype: 'warning',
        },
      ],
    });
  }
};
