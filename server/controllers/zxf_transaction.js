const login_oculus = require('../db_apis/zxf_transaction.js');
const api_log = require('../db_apis/api_log.js');

async function get(req, res, next) {
    try {
        const oculus_id = req.query.oid;

        if(oculus_id == null) {
            throw {name : 'NullOculusId', errorNum : 30001, message: 'oculus id could not be null'}
        }

        const result = await login_oculus.transactionExecute(oculus_id);
        
        const log = await api_log.apiCallLog('temp', 'get', 'T', {});
        
        res.status(200).json({ code: 2000 });
    } catch (err) {        
        //console.log(err);        
        await api_log.apiCallLog('temp', 'get', 'F', err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.get = get;

async function post(req, res, next) {
    try {
        const oculus_id = req.body.oid;

        if(oculus_id == null) {
            throw {name : 'NullOculusId', errorNum : 30001, message: 'oculus id could not be null'}
        }

        const result = await login_oculus.transactionExecute(oculus_id);
        
        const log = await api_log.apiCallLog('temp', 'post', 'T', {});

        res.status(200).json({ code: 2000 });
    } catch (err) {        
        //console.log(err);        
        await api_log.apiCallLog('temp', 'post', 'F', err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.post = post;