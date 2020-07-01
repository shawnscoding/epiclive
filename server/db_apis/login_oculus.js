const oracledb = require('oracledb');
const database = require('../services/database.js');
const common = require('../common/common.js');

// Oculus Id Login API
async function transactionExecute(oid, method) {
  const binds = {};
  let session_key;
  
  const result = await database.transactionExecute(function (conn, opts) {
    return new Promise(async (resolve, reject) => {
      let result;
      try {     
        const querystring = `select 
                              oculus_id "oculus_id",
                              session_key "session_key" 
                            from session_oid 
                            where oculus_id = :oid
                            `;
        result = await conn.execute(querystring, [oid]);
        console.log(result);

        session_key = await common.uuid();
        
        if(result.rows.length > 0) {
            //console.log('==========Update=========');
            result = await conn.execute(`UPDATE session_oid set session_key = :session_key where oculus_id = :oid`, [session_key, oid]);  
        } else {
            //console.log('==========Insert=========');
            result = await conn.execute(`INSERT INTO session_oid (oculus_id, session_key) VALUES (:oid, :session_key)`, [oid, session_key]);    
        }

        result = await conn.execute(`INSERT INTO dragon_loginhistory (oid, type, status)
                                    values (:oculus_id, :type, :status)`, [oid, 'oculus', 1]);

        result = await conn.execute(`INSERT INTO api_log (api_name, method, status) 
                                    values (:api_name, :method, :status)`, ['login_oculus', method, 'T']);
  
        resolve(result);
      } catch (err) {    
        reject(err);
      } 
    });
  });

  return session_key;
}

module.exports.transactionExecute = transactionExecute;