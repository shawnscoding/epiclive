// !! alter
const queryToCP = `
SELECT title "title",
priority "priority",
genre_list "genre_list",
usageyn "usageyn",
id "id"
FROM react.cp
`;

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
      return null;
  }
};

module.exports = (category, params) => {
  if (category === undefined) {
    return;
  }
  let query = getCategory(category);
  if (params && params !== undefined) {
    query += `\nWHERE title like '%${params}%'`;
  }
  //   if false, will return null
  return query;
};
