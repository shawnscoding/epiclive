const oracledb = require('oracledb');
const database = require('../services/database.js');

// API Call Fail Log
async function apiCallLog(api_name, method, status, err) {
  const binds = {};
  
  const result = await database.transactionExecute(function (conn, opts) {
    return new Promise(async (resolve, reject) => {
      let result;
      try {             
        result = await conn.execute(`INSERT INTO api_log (api_name, method, status, err_code, err_msg) 
                                    values (:api_name, :method, :status, :err_code, :err_msg)`, [api_name, method, status, err.errorNum, err.message]);
  
        resolve(result);
      } catch (err) {    
        reject(err);
      } 
    });
  });

  return result;
}

module.exports.apiCallLog = apiCallLog;