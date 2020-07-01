const oracledb = require('oracledb');
const database = require('../services/database.js');

// Avatar Position Info
async function transactionExecute(context) {
    const binds = {};
    let re;
    
    const result = await database.transactionExecute(function (conn, opts) {
      return new Promise(async (resolve, reject) => {
        try {
          let querystring = `select 
                              x1 || ',' || y1 || ',' || z1 "p1",
                              x2 || ',' || y2 || ',' || z2 "p2",
                              x3 || ',' || y3 || ',' || z3 "p3",
                              x4 || ',' || y4 || ',' || z4 "p4",
                              x5 || ',' || y5 || ',' || z5 "p5",
                              x6 || ',' || y6 || ',' || z6 "p6",
                              x7 || ',' || y7 || ',' || z7 "p7",
                              x8 || ',' || y8 || ',' || z8 "p8",
                              x9 || ',' || y9 || ',' || z9 "p9",
                              x10 || ',' || y10 || ',' || z10 "p10"
                            from AVATAR_POSITION
                            where ID = '1'
                            `;

          const result = await conn.execute(querystring, [], { outFormat: oracledb.OBJECT });

          re = {
            code : 2000,
            position : result.rows.length == 1 ? [result.rows[0]] : [{}]
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