// @@ modify table name
module.exports.insertQuery = `insert into store (
    workspace_id,
    name,
    companyno,
    phone,
    email,
    address1
  ) values (
    :workspace_id,
    :name,
    :companyno,
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
SELECT COUNT(*) from store
`;

// @@ modify table name

module.exports.deleteQuery = `DELETE FROM store
where id = :id
`;

// @@ modify table name
module.exports.updateQuery = `update store
  set workspace_id = :workspace_id,
  name = :name,
  phone = :phone,
  companyno = :companyno,
    email = :email,
    address1 = :address1
  where id = :id`;
