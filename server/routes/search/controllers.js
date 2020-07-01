const getQuery = require("./query");
const Joi = require("joi");
const { search } = require("./../../common/joi");
const database = require("../../services/database.js");
const { checkSort } = require("./../../common/helper");

const find = async (req) => {
  const binds = {};

  const route = req.params.route;
  const params = req.params.params;

  const error = search(route, params);
  if (error) {
    return res.status(400).json({
      errors: [{ message: "Bad request", alerttype: "warning" }],
    });
  }

  const query = getQuery(route, params);
  if (!query) {
    return res.status(400).json({
      errors: [{ message: "Bad request", alerttype: "warning" }],
    });
  }

  let sort;
  let result;
  if (req.headers.sort === "undefined") {
    result = await database.simpleExecute(query, binds);
  } else {
    const { column, direction, isNullLast } = JSON.parse(req.headers.sort);

    const query_after_sort = checkSort(column, direction, query);
    result = await database.simpleExecute(query_after_sort, binds);

    sort = { column, direction };
  }

  result.servedSort = sort;

  if (Array.isArray(result.rows)) {
    return result;
  } else {
    throw Error("something wrong in oracle");
  }
};

module.exports.get = async (req, res) => {
  const result = await find(req);

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
