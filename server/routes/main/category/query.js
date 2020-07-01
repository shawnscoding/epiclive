module.exports.insertQuery = `insert into category (
    workspace_id,
    title,
    priority,
    genre_list,
    usageyn
  ) values (
    :workspace_id,
    :title,
    :priority,
    :genre_list,
    :usageyn
  ) returning id
  into :id`;

module.exports.selectQuery = `
SELECT *
FROM
  (SELECT id "id",
`;

module.exports.selectTotalLengthQuery = `
SELECT COUNT(*) from category
`;

module.exports.deleteQuery = `DELETE FROM category
where id = :id
`;

module.exports.updateQuery = `update category
  set workspace_id = :workspace_id,
    title = :title,
    priority = :priority,
    genre_list = :genre_list,
    usageyn = :usageyn
  where id = :id`;
