// !! alter

const queryToCP = `SELECT title "title",
name "name",
phone "phone",
email "email",
address1 "address1",
id "id"
FROM react.cp`;

const queryToCategory = `
SELECT title "title",
priority "priority",
genre_list "genre_list",
usageyn "usageyn",
id "id"
FROM react.category
`;

const getCategory = (category) => {
  switch (category) {
    case "category":
      return queryToCategory;
    case "CP":
      return queryToCP;

    default:
      return;
  }
};

module.exports = (category, id) => {
  let query = getCategory(category);
  if (id === undefined) {
    return;
  }
  query += `\nWHERE id = '${id}'`;
  //   if false, will return null
  return query;
};
