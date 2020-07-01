module.exports.insertContent = `insert into content (
    workspace_id,
    cp_id,
    category_id,
    url_image,
    title,
    story,
    artist_list,
    is_delete,
    episode,
    lang,
    priority,
    genre_list,
    usageyn
  ) values (
    :workspace_id,
    :cp_id,
    :category_id,
    :url_image,
    :title,
    :story, 
    :artist_list,
    :is_delete,
    :episode,
    :lang,
    :priority,
    :genre_list,
    :usageyn
  ) returning id
  into :id`;

module.exports.insertImage = `insert into setimage (
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

module.exports.getSelectToContentQuery = (id) => `SELECT title "title",
lang "lang",
priority "priority",
artist_list "artist_list",
genre_list "genre_list",
usageyn "usageyn",
id "id"
FROM content
where id = '${id}'
`;

module.exports.getSelectToSetImageQuery = (id) => `SELECT title "title",
priority "priority",
usageyn "usageyn",
image_type "image_type",
id "id"
FROM setimage
where content_id = '${id}'
`;
