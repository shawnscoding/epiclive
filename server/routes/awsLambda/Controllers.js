const jwt = require('jsonwebtoken');
const config = require('config');
const oracledb = require('oracledb');
const { getQuery, getQueryToCommonCode } = require('./query');
const database = require('../../services/database.js');

// @@desc for cognity authentication
module.exports.get = (req, res) => {
  const { token } = req.params;
  console.log('hitted ');
  if (!token) {
    console.log('no token ');

    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, authorization denied' }] });
  }
  const decoded = jwt.verify(token, config.get('jwtSecret'));
  if (decoded.user.user_type === 'admin') {
    res.status(200).json({ code: 200 });
  } else {
    return res.status(401).json({ errors: [{ msg: 'Token is not valied' }] });
  }
};

const handleStoreVod = file => {
  const { videotype, accountId, job_id, uid, vod_info, vod_title } = file;
  const { base_url, durationInMs } = vod_info;
  const record = {
    workspace_id: 'WS216863988676954993388743949988460632986',
    cp_id: 'CP222309651885829824738906407148198013677',
    file_type: videotype,
    aws_accountid: accountId,
    aws_job_id: job_id,
    aa_cms_user_id: uid,
    durationInMs,
    url_vod: base_url,
    file_name: vod_title[0],
  };

  return record;
};

const handleStoreFile = file => {
  const { name, url_file, filetype } = file;
  const record = {
    workspace_id: 'WS216863988676954993388743949988460632986',
    cp_id: 'CP222309651885829824738906407148198013677',
    title: name,
    url_file,
    file_type: filetype,
  };

  console.log('----record');
  console.log(record);
  return record;
};

const handleStoreImage = file => {
  const { name, url_image, imagetype } = file;
  const record = {
    workspace_id: 'WS216863988676954993388743949988460632986',
    cp_id: 'CP222309651885829824738906407148198013677',
    title: name,
    url_file: url_image,
    file_type: imagetype,
  };

  console.log('----record');
  console.log(record);
  return record;
};

// @@desc get file from s3 and dinamically store it in oracle db
module.exports.post = async (req, res) => {
  // do validation here ...
  // const parsedFile = JSON.parse(req.body);
  const copiedBody = { ...req.body };
  const file = JSON.parse(copiedBody.str);
  console.log(`file---`);
  console.log(file);

  let record;

  if (file.url_file) {
    record = handleStoreFile(file);
  } else if (file.url_image) {
    record = handleStoreImage(file);
  } else if (file.videotype) {
    record = handleStoreVod(file);
  }
  const { file_type } = record;

  // // fetch codetype here ...
  const queryToCommonCode = getQueryToCommonCode(file_type);
  if (queryToCommonCode === undefined) {
    return res.status(400).json({
      errors: [{ message: 'Bad request' }],
    });
  }

  const binds = {};

  const result = await database.simpleExecute(queryToCommonCode, binds);
  if (!result.rows.length) {
    return res.status(400).json({
      errors: [{ message: 'Bad request' }],
    });
  }
  const { code } = result.rows[0];
  console.log(result.rows[0]);

  record.file_type = code;

  const query = getQuery(code);

  // !! todo fix cp_id, workspace_id

  record.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.STRING,
  };

  const finalResult = await database.simpleExecute(query, record);

  const id = finalResult.outBinds.id[0];
  record.id = id;

  console.log(`finalResult----------`);
  console.log(finalResult);

  return res.status(200).send('succeeded');
};
