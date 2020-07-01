const deleteUnSelectedColumn = (cols, rows) => {
  let result;
  for (let i = 0; i < cols.length; i++) {
    if (cols[i][Object.keys(cols[i])[0]] === false) {
      // if false, delete property
      for (let z = 0; z < rows.length; z++) {
        delete rows[z][Object.keys(cols[i])[0]];
      }
    }
  }

  result = rows;
  return result;
};

module.exports.filterColumns = function(cols, rows) {
  if (cols) {
    const formatedCols = cols.map(col => ({
      [col.name]: col.fetch,
    }));

    return deleteUnSelectedColumn(formatedCols, rows);
  }
};

module.exports.checkSort = function(column, direction, query) {
  console.log('colum');
  console.log(column, direction);
  let direct;
  if (direction === 'ascending') {
    direct = 'ASC';
  } else if (direction === 'descending') {
    direct = 'DESC';
  }
  query += `\nROW_NUMBER() OVER (ORDER BY ${column} ${direct}) R`;

  return query;
};

module.exports.checkDate = function(req, query) {
  // if false, return error msg
  const startDate = req.headers.start_date;
  const endDate = req.headers.end_date;

  if (startDate !== 'undefined' && startDate !== undefined && startDate) {
    if (endDate !== 'undefined' && endDate !== undefined && endDate) {
      const start = JSON.parse(startDate);
      const end = JSON.parse(endDate);
      query += `\nAND to_char(created,'yyyy-mm-dd') >= '${start}'`;
      query += `\nAND to_char(created,'yyyy-mm-dd') <= '${end}'`;
    }
    return query;
  }
  return null;
};

module.exports.checkParams = function(req, query) {
  const { params } = req.params;

  const param = params;
  if (!param && param === undefined) return query;
  query += `\nWHERE title like '%${param}%'`;

  return query;
};

// this is for pieChart
// !! is there a way to select record as lowercase key ?
module.exports.mapRecords = function(rows) {
  if (!rows) return;
  const test = rows.map(row => {
    row.name = row.NAME;
    row.value = row.COUNT;
    row.last_watch = row.LAST_WATCH;

    delete row.NAME;
    delete row.COUNT;
    delete row.LAST_WATCH;

    return row;
  });

  return test;
};

// module.exports.mapPurposeToNumber = (purpose) => {
//   if (purpose !== true) return;

//   for (lists[imagePurposeList]){
//     return 0
//   }
// }
