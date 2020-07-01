const oracledb = require('oracledb');
const database = require('../services/database.js');

// Version Management
async function transactionExecute(context) {
    const binds = {};
    let re;
    
    const result = await database.transactionExecute(function (conn, opts) {
      return new Promise(async (resolve, reject) => {
        try {
          let querystring = `select version "version", 
                              required "required",
                              app_refresh "app_rtime",
                              friend_refresh "friend_rtime"
                              from app_version where id = '1'
                              `;
          const result1 = await conn.execute(querystring, [], { outFormat: oracledb.OBJECT });
          
          querystring = `select version "version", url "api_url" from livr_version where id = '1'`;
          const result2 = await conn.execute(querystring, [], { outFormat: oracledb.OBJECT });

          querystring = `select name "name",
                              move_time "move_time",
                              wait_time "wait_time",
                              change_time "change_time"
                              from APP_SETTING
                              `;
          const result3 = await conn.execute(querystring, [], { outFormat: oracledb.OBJECT });

          re = {
            code : 2000,
            app : result1.rows.length == 1 ? [result1.rows[0]] : [{}],
            livr : result2.rows.length == 1 ? [result2.rows[0]] : [{}],
            setting : result3.rows,
          }

          resolve(re);
        } catch (err) {    
          reject(err);
        } 
      });
    });
  
    return re;
  }
  
  module.exports.transactionExecute = transactionExecute;