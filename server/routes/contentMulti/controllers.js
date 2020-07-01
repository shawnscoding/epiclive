const { create, find } = require('./db_apis.js');

module.exports.post = async function(req, res) {
  // do validation here

  const result = await create(req.body);

  res.status(200).json(result);
};
// @@ the reason to explicitly make this routes is that it has to fetch all fields
module.exports.get = async (req, res) => {
  const result = await find(req, res);

  console.log(result, 'result');

  return res.status(200).json(result);
};
