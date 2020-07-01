// @@ modify table name
module.exports.insertQuery = `insert into cp (
    workspace_id,
    title,
    name,
    phone,
    email,
    address1
  ) values (
    :workspace_id,
    :title,
    :name,
    :phone,
    :email,
    :address1
  ) returning id
  into :id`;

// @@ modify table name
module.exports.selectQuery = `
SELECT *
FROM
  (SELECT id "id",`;

module.exports.selectTotalLengthQuery = `
SELECT COUNT(*) from cp
`;

// @@ modify table name

module.exports.deleteQuery = `DELETE FROM cp
where id = :id
`;

// @@ modify table name
module.exports.updateQuery = `update cp
  set workspace_id = :workspace_id,
    title = :title,
    name = :name,
    phone = :phone,
    email = :email,
    address1 = :address1
  where id = :id`;
