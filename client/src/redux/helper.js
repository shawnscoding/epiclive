export const checkHasDate = (payload) => {
  // return undefined if not

  let startDate;
  let endDate;
  if (payload.startDate && payload.endDate) {
    startDate = JSON.stringify(payload.startDate);
    endDate = JSON.stringify(payload.endDate);
  } else {
    startDate = undefined;
    endDate = undefined;
  }

  return { startDate, endDate };
};

export const addBooleanToArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].checked = false;
  }
  return arr;
};

export const mapColumnNamesForNewTable = (arr) => {
  const array = arr
    .map((obj) => {
      obj.title = obj.name;
      obj.field = obj.name;
      delete obj.name;
      return obj;
    })
    .filter((arr) => arr.title !== 'id');

  return array;
};
