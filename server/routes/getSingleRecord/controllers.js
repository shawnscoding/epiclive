const getQuery = require("./query");
const { search } = require("../../common/joi");
const database = require("../../services/database.js");

const find = async (req) => {
  const binds = {};

  console.log(req.params, "params");

  const id = req.params.id;
  const category = req.params.category;

  //   need to edit
  // const error = search(category, id);
  // if (error) {
  //   return res.status(400).json({
  //     errors: [{ message: "Bad request", alerttype: "warning" }],
  //   });
  // }

  const query = getQuery(category, id);
  if (!query) {
    return res.status(400).json({
      errors: [{ message: "Bad request", alerttype: "warning" }],
    });
  }

  const result = await database.simpleExecute(query, binds);

  if (Array.isArray(result.rows)) {
    return result;
  } else {
    throw Error("something wrong in oracle");
  }
};

// @@ the reason to explicitly make this routes is that it has to fetch all fields
module.exports.get = async (req, res) => {
  const result = await find(req);

  console.log(result, "result");

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
