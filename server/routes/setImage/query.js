module.exports.insertQuery = `insert into setimage (
  title,
  priority,
  image_type,
    content_id,
    usageyn
  ) values (
    :title,
    :priority,
    :image_type,
    :content_id,
    :usageyn
  ) returning id
  into :id`;

module.exports.selectQuery = `SELECT title "title",
priority "priority",
usageyn "usageyn",
image_type "image_type",
id "id"
FROM setimage`;

module.exports.deleteQuery = `DELETE FROM setimage
where id = :id`;

module.exports.updateQuery = `update setimage
  set title = :title,
    priority = :priority,
    usageyn = :usageyn,
    image_type = :image_type
  where id = :id`;
