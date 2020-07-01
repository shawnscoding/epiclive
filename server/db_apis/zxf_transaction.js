const oracledb = require('oracledb');
const database = require('../services/database.js');

// 
async function transactionExecute(oid, session_key) {
    const binds = {};
    
    const result = await database.transactionExecute(function (conn, opts) {
      return new Promise(async (resolve, reject) => {
        let result;
        try {     
            result = await conn.execute(`INSERT INTO notice (ID, TITLE) VALUES (:id, :title)`, [1, 'Chris'], opts);

            result = await conn.execute(`INSERT INTO notice (ID, TITLE) VALUES (:id, :title)`, [2, 'Chris'], opts);


            result = await conn.execute(`INSERT INTO api_log (api_name, method, status) 
                                        values (:api_name, :method, :status)`, ['temp', 'post', 'T']);

            resolve(result);
        } catch (err) {    
            reject(err);
        } 
      });
    });
  
    return result;
  }
  
  module.exports.transactionExecute = transactionExecute;