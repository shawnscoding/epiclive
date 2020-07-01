const oracledb = require('oracledb');
const database = require('../services/database.js');

//
async function transactionExecute(jstr, livr_id, cnt = 15) {
  const binds = {};
  let re;
  
  const result = await database.transactionExecute(function (conn, opts) {
    return new Promise(async (resolve, reject) => {
      let querystring;
      let result;
      try {     
        const arr = JSON.parse(jstr);   
        let oid_list = '(';
        for(let i=0;i<arr.length;i++){
          oid_list += "'" + arr[i].id + "'"; 
          if(i+1 != arr.length) oid_list += ',';
        }
        oid_list += ')';
        console.log(oid_list);

        querystring = `select 
                        m.OCULUS_ID "oid",
                        m.LIVR_ID "lid",
                        m.Avatar_index "ava_index",
                        --sl.ALIVE_CHK_TIME "alive_chk_time",
                        unixtime(CURRENT_TIMESTAMP) - sl.ALIVE_CHK_TIME "gap",
                        CASE WHEN ((unixtime(CURRENT_TIMESTAMP) - sl.ALIVE_CHK_TIME) <= 60 AND
                        (unixtime(CURRENT_TIMESTAMP) - sl.ALIVE_CHK_TIME) >= 0) THEN 'y' ELSE 'n' END "login"
                      from MAPPING_LID m join SESSION_LID sl
                      on m.LIVR_ID = sl.LIVR_ID
                      where oculus_id IN ` + oid_list; 
        result = await conn.execute(querystring, [], { outFormat: oracledb.OBJECT });

        if(arr.length <= cnt){
          re = {
            code : 2000,
            map : result.rows.length > 0 ? result.rows : [],
            req_user_cnt : arr.length
          }          
        } else {
          re = {
            code : 30011,
            map : result.rows.length > 0 ? result.rows : [],
            req_user_cnt : arr.length
          }          
        }

        result = await conn.execute(`INSERT INTO api_log (api_name, method, status) 
                                    values (:api_name, :method, :status)`, ['mapping_lid', 'get', 'T']);
  
        resolve(result);
      } catch (err) {    
        reject(err);
      } 
    });
  });

  return re;
}

module.exports.transactionExecute = transactionExecute;