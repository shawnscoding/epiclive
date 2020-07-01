const oracledb = require('oracledb');
const database = require('../services/database.js');

//
async function getAvatar(lid) {
  const binds = {};
  let re;
  
  const result = await database.transactionExecute(function (conn, opts) {
    return new Promise(async (resolve, reject) => {
      let querystring;
      let result;
      try {     
        querystring = `select Avatar_index "ava_index"
                      from MAPPING_LID
                      where LIVR_ID = :lid
                      `;
        result = await conn.execute(querystring, [lid], { outFormat: oracledb.OBJECT });
        
        re = {
          code : 2000,
          lid : lid,
          ava_index : result.rows.length == 1 ? result.rows[0].ava_index : 1
        }

        result = await conn.execute(`INSERT INTO api_log (api_name, method, status) 
                                    values (:api_name, :method, :status)`, ['avatar', 'get', 'T']);
  
        resolve(result);
      } catch (err) {    
        reject(err);
      } 
    });
  });

  return re;
}

module.exports.getAvatar = getAvatar;

async function changeAvatar(lid, ava_index, method) {
  const binds = {};
  
  const result = await database.transactionExecute(function (conn, opts) {
    return new Promise(async (resolve, reject) => {
      let querystring;
      let result;
      try { 
        result = await conn.execute(`UPDATE mapping_lid set avatar_index = :ava_index where livr_id = :lid`, [ava_index, lid]);    

        result = await conn.execute(`INSERT INTO api_log (api_name, method, status) 
                                    values (:api_name, :method, :status)`, ['avatar', method, 'T']);

        resolve(result);
      } catch (err) {    
        reject(err);
      } 
    });
  });

  return result;
}

module.exports.changeAvatar = changeAvatar;