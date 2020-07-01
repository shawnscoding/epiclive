const login_livr = require('../db_apis/login_livr.js');
const api_log = require('../db_apis/api_log.js');

async function get(req, res, next) {
    try {
        const oculus_id = req.query.oid;
        const livr_id = req.query.lid;
        const avatar_index = req.query.avatar_index;

        if(livr_id == null) {
            throw {name : 'NullLivrId', errorNum : 30002, message: 'livr id id could not be null'}
        } else if(oculus_id == null) {
            throw {name : 'NullOculusId', errorNum : 30001, message: 'oculus id could not be null'}
        }

        const session_key = await login_livr.transactionExecute(livr_id, oculus_id, avatar_index);
        
        res.status(200).json({ code: 2000, session_key: session_key});
    } catch (err) {              
        await api_log.apiCallLog('login_livr', 'get', 'F' , err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.get = get;

async function post(req, res, next) {
    try {
        const oculus_id = req.body.oid;
        const livr_id = req.body.lid;
        const avatar_index = req.body.avatar_index;

        if(livr_id == null) {
            throw {name : 'NullLivrId', errorNum : 30002, message: 'livr id id could not be null'}
        } else if(oculus_id == null) {
            throw {name : 'NullOculusId', errorNum : 30001, message: 'oculus id could not be null'}
        }

        const session_key = await login_livr.transactionExecute(livr_id, oculus_id, avatar_index, 'post');
        
        res.status(200).json({ code: 2000, session_key: session_key});
    } catch (err) {               
        await api_log.apiCallLog('login_livr', 'post', 'F' , err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.post = put;

async function put(req, res, next) {
    try {
        const oculus_id = req.body.oid;
        const livr_id = req.body.lid;
        const avatar_index = req.body.avatar_index;

        if(livr_id == null) {
            throw {name : 'NullLivrId', errorNum : 30002, message: 'livr id id could not be null'}
        } else if(oculus_id == null) {
            throw {name : 'NullOculusId', errorNum : 30001, message: 'oculus id could not be null'}
        }

        const session_key = await login_livr.transactionExecute(livr_id, oculus_id, avatar_index, 'put');
        
        res.status(200).json({ code: 2000, session_key: session_key});
    } catch (err) {               
        await api_log.apiCallLog('login_livr', 'put', 'F' , err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.put = put;