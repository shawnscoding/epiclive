const oracledb = require('oracledb');
const database = require('../services/database.js');

// Session Check API
async function transactionExecute(id, type, session_key) {
    const binds = {};
    let re;

    const result = await database.transactionExecute(function (conn, opts) {
      return new Promise(async (resolve, reject) => {
        let result;

        try {     
            if(type == 'oid'){
                const querystring = `select session_key "session_key" 
                                    from session_oid
                                    where oculus_id = :id
                                    and session_key = :session_key
                                    `;
                result = await conn.execute(querystring, [id, session_key]);
                re = (result.rows.length > 0 ? true : false);
                if(re) result = await conn.execute(`UPDATE session_oid set alive_chk = 'y' where oculus_id = :id`, [id]);    
            } else if(type == 'lid') {
                const querystring = `select session_key "session_key" 
                                    from session_lid
                                    where livr_id = :id
                                    and session_key = :session_key
                                    `;
                result = await conn.execute(querystring, [id, session_key]);
                re = (result.rows.length > 0 ? true : false); 
                if(re) result = await conn.execute(`UPDATE session_lid set alive_chk = 'y' where livr_id = :id`, [id]);    
            }
            resolve(result);
        } catch (err) {    
            reject(err);
        } 
      });
    });

    return re;
  }
  
  module.exports.transactionExecute = transactionExecute;