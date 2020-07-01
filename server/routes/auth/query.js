const selectQuery = `SELECT name "name",
workspace_id "workspace_id",
upload_key "upload_key",
user_type "user_type",
id "id" 
FROM react.aa_cms_user
`;
module.exports.selectQuery = selectQuery;

//LoginEpicLiveAccount('jyblues@gmail.com', '1234', '');
// console.log(_get.id, "_get.id");
// LoginEpicLiveAccount(_get.id, _get.key, _get.target);
