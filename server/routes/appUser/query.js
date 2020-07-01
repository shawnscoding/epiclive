const insertQuery = `insert into app_user (
    workspace_id,
    username,
    account,
    password,
    status,
    tag,
    sex,
    avatar_index,
    unixtime,
    created_by
  ) values (
    :workspace_id,
    :username,
    :account,
    :password,
    :status,
    :tag,
    :sex,
    :avatar_index,
    :unixtime,
    :created_by 
  ) returning id
  into :id`;

module.exports.insertQuery = insertQuery;

const selectQuery = `SELECT username "username",
account "account",
status "status",
tag "tag",
sex "sex",
id "id"
FROM react.app_user`;
module.exports.selectQuery = selectQuery;

const deleteQuery = `DELETE FROM react.app_user`;
module.exports.deleteQuery = deleteQuery;

const updateQuery = `update app_user
  set username = :username,
    account = :account,
    status = :status,
    tag = :tag,
    sex = :sex,
    updated_by = :updated_by
  where id = :id`;

module.exports.updateQuery = updateQuery;

const updateQueryWithPassword = `update app_user
  set username = :username,
    account = :account,
    password = :password,
    status = :status,
    tag = :tag,
    sex = :sex,
    updated_by = :updated_by
  where id = :id`;
//

module.exports.updateQueryWithPassword = updateQueryWithPassword;
