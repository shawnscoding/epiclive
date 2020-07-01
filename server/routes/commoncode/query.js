module.exports.getSelectQuery = codetype => `SELECT cname "cname",
codetype "codetype"
FROM code
WHERE codetype = ${codetype}`;
