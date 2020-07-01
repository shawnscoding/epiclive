const insertToAssetVODQuery = `insert into assetvod (
  workspace_id,
    cp_id,
    vod_type,
      aws_accountid,
      aws_job_id,
      aa_cms_user_id,
      durationInMs,
      url_vod,
      file_name

    ) values (
      :workspace_id,
      :cp_id,
      :file_type,
      :aws_accountid,
      :aws_job_id,
      :aa_cms_user_id,
      :durationInMs,
      :url_vod,
      :file_name

    ) returning id
    into :id`;

const insertToAssetImageQuery = `insert into assetimage (
      workspace_id,
      cp_id,
      image_type,
        title,
        url_image
      ) values (
        :workspace_id,
        :cp_id,
        :file_type,
        :title,
        :url_file
      ) returning id
      into :id`;

const insertToAssetFileQuery = `insert into assetfile (
  workspace_id,
  cp_id,
  file_type,
    title,
    url_file
  ) values (
    :workspace_id,
    :cp_id,
    :file_type,
    :title,
    :url_file
        ) returning id
        into :id`;

const getCategory = code => {
  switch (code) {
    case 1100:
    case 1101:
    case 1102:
    case 1103:
      return insertToAssetVODQuery;
    case 1110:
    case 1111:
    case 1112:
    case 1113:
      return insertToAssetImageQuery;
    case 1120:
    case 1121:
    case 1122:
      return insertToAssetFileQuery;
    default:
  }
};

module.exports.getQuery = codetype => {
  const query = getCategory(codetype);
  if (query === undefined) {
    return;
  }
  return query;
};

module.exports.getQueryToCommonCode = cName => `SELECT cname "cname",
code "code"
FROM code
WHERE cname = '${cName}'`;
