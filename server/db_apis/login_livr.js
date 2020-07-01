const oracledb = require('oracledb');
const database = require('../services/database.js');
const common = require('../common/common.js');

// Oculus Id Login API
async function transactionExecute(lid, oid, avatar_index = 1, method) {
  const binds = {};
  let session_key;
  
  const result = await database.transactionExecute(function (conn, opts) {
    return new Promise(async (resolve, reject) => {
      let querystring;
      let result;
      try {     
        querystring = `select livr_id "livr_id"
                      from session_lid
                      where livr_id = :lid
                      `;
        result = await conn.execute(querystring, [lid]);
        console.log(result);

        session_key = await common.uuid();
        
        if(result.rows.length > 0) {
          //console.log('==========Update=========');
          result = await conn.execute(`UPDATE session_lid set session_key = :session_key, alive_chk = 'y' where livr_id = :lid`, [session_key, lid]);
        } else {
          //console.log('==========Insert=========');
          result = await conn.execute(`INSERT INTO session_lid (livr_id, session_key) VALUES (:lid, :session_key)`, [lid, session_key]);
        }

        result = await conn.execute(`UPDATE mapping_lid set oculus_id = null where oculus_id = :oid`, [oid]);

        querystring = `select livr_id "livr_id"
                      from mapping_lid
                      where livr_id = :lid
                      `;
        result = await conn.execute(querystring, [lid]);
        
        if(result.rows.length > 0) {          
          result = await conn.execute(`UPDATE mapping_lid set oculus_id = :oid where livr_id = :lid`, [oid, lid]);
        } else {          
          result = await conn.execute(`INSERT INTO mapping_lid (livr_id, oculus_id, avatar_index) VALUES (:lid, :oid, :avatar_index)`, [lid, oid, avatar_index]);
        }

        result = await conn.execute(`INSERT INTO dragon_loginhistory (lid, oid, type, status)
                                    values (:livr_id, :oculus_id, :type, :status)`, [lid, oid, 'livr', 1]);

        result = await conn.execute(`INSERT INTO api_log (api_name, method, status) 
                                    values (:api_name, :method, :status)`, ['login_livr', method, 'T']);
  
        resolve(result);
      } catch (err) {    
        reject(err);
      } 
    });
  });

  return session_key;
}

module.exports.transactionExecute = transactionExecute;