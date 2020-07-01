const {
  insertContent,
  insertImage,
  getSelectToContentQuery,
  getSelectToSetImageQuery,
} = require("./query");
const database = require("../../services/database.js");
const oracledb = require("oracledb");

module.exports.create = async function (body) {
  // @@ alter
  const { contentForm, imageForm } = body;

  // @@ alter
  contentForm.workspace_id = "WS216863988676954993388743949988460632986";
  // need to query to category to get id with name
  contentForm.cp_id = "CP222309651885829824738906407148198013677";
  // obj.assetimage_id = "test2";

  // !! do  ASSETIMAGE_ID and url_image, after query to s3
  contentForm.URL_IMAGE = "test";
  contentForm.is_delete = 1;
  // obj.lang = obj.Language;

  const content = Object.assign({}, contentForm);

  content.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.STRING,
  };

  const result_1 = await database.simpleExecute(insertContent, content);

  if (result_1.rowsAffected < 1) {
    throw Error("something wrong");
  }
  content.id = result_1.outBinds.id[0];
  console.log(content.id, "ㅐ야야id");
  delete content.workspace_id;

  // second work

  imageForm.content_id = content.id;

  // delete imageForm.title;
  // delete imageForm.usageyn;

  const setImage = Object.assign({}, imageForm);
  setImage.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.STRING,
  };

  const result_2 = await database.simpleExecute(insertImage, setImage);

  if (result_1.rowsAffected < 1) {
    throw Error("something wrong");
  }
  setImage.id = result_2.outBinds.id[0];

  delete setImage.workspace_id;

  //   returns object
  return content;
};

module.exports.find = async (req, res) => {
  const binds = {};

  const id = req.params.id;
  if (id === undefined) {
    return res.status(400).json({
      errors: [{ message: "Bad request", alerttype: "warning" }],
    });
  }

  //   need to edit
  // const error = search(category, id);
  // if (error) {
  //   return res.status(400).json({
  //     errors: [{ message: "Bad request", alerttype: "warning" }],
  //   });
  // }

  const queryToContent = getSelectToContentQuery(id);
  if (!queryToContent) {
    return res.status(400).json({
      errors: [{ message: "Bad request", alerttype: "warning" }],
    });
  }

  const result_1 = await database.simpleExecute(queryToContent, binds);
  console.log("---------result_1");
  console.log(result_1.rows);
  if (Array.isArray(result_1.rows) !== true || result_1.rows.length < 1) {
    return res.status(404).json({
      errors: [{ message: "not found any record", alerttype: "warning" }],
    });
  }

  // second query
  const queryToSetImage = getSelectToSetImageQuery(id);

  const result_2 = await database.simpleExecute(queryToSetImage, binds);

  if (Array.isArray(result_2.rows) !== true || result_2.rows.length < 1) {
    return res.status(404).json({
      errors: [{ message: "not found any record", alerttype: "warning" }],
    });
  }
  return {
    content: result_1.rows,
    setImage: result_2.rows,
    setImageMetaData: result_2.metaData,
  };
};
