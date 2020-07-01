const login_oculus = require('../db_apis/login_oculus.js');
const api_log = require('../db_apis/api_log.js');

async function get(req, res, next) {
    try {
        const oculus_id = req.query.oid;

        if(oculus_id == null) {
            throw {name : 'NullOculusId', errorNum : 30001, message: 'oculus id could not be null'}
        }

        const session_key = await login_oculus.transactionExecute(oculus_id);
        
        res.status(200).json({ code: 2000, session_key: session_key, sec: 3});
    } catch (err) {              
        await api_log.apiCallLog('login_oculus', 'get', 'F' , err);
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

        const session_key = await login_oculus.transactionExecute(oculus_id, 'post');
        
        res.status(200).json({ code: 2000, session_key: session_key, sec: 3});
    } catch (err) {                
        await api_log.apiCallLog('login_oculus', 'post', 'F' , err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.post = post;

async function put(req, res, next) {
    try {
        const oculus_id = req.body.oid;

        if(oculus_id == null) {
            throw {name : 'NullOculusId', errorNum : 30001, message: 'oculus id could not be null'}
        }

        const session_key = await login_oculus.transactionExecute(oculus_id, 'put');
        
        res.status(200).json({ code: 2000, session_key: session_key, sec: 3});
    } catch (err) {                
        await api_log.apiCallLog('login_oculus', 'put', 'F' , err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.put = put;