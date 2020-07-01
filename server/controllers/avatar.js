const api_log = require('../db_apis/api_log.js');
const session_check = require('../db_apis/session_check.js');
const avatar = require('../db_apis/avatar.js');

async function get(req, res, next) {
    try {
        const livr_id = req.query.lid;
        const session_key = req.query.session_key;

        if(livr_id == null) {
            throw {name : 'NullLivrId', errorNum : 30002, message: 'livr id could not be null'}
        } else if(session_key == null) {
            throw {name : 'NullSessionKey', errorNum : 30003, message: 'session key could not be null'}
        }

        let result = await session_check.transactionExecute(livr_id, 'lid', session_key);
        
        if(result){
            result = await avatar.getAvatar(livr_id);
            res.status(200).json(result);
        } else {
            res.status(200).json({ code: 10000 });
        }
    } catch (err) {          
        await api_log.apiCallLog('avatar', 'get', 'F', err);
        res.status(500).json({ code: 5000, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.get = get;

async function post(req, res, next) {
    try {
        const livr_id = req.body.lid;
        const session_key = req.body.session_key;
        const ava_index = req.body.ava_index;        

        if(livr_id == null) {
            throw {name : 'NullLivrId', errorNum : 30002, message: 'livr id could not be null'}
        } else if(session_key == null) {
            throw {name : 'NullSessionKey', errorNum : 30003, message: 'session key could not be null'}
        } else if(ava_index == null) {
            throw {name : 'NullAvatar_Index', errorNum : 30004, message: 'avatar index could not be null'}
        }

        let result = await session_check.transactionExecute(livr_id, 'lid', session_key, 'post');

        if(result){
            result = await avatar.changeAvatar(livr_id, ava_index);
            res.status(200).json({ code: 2000 });
        } else {
            res.status(200).json({ code: 10000 });
        }
    } catch (err) {        
        await api_log.apiCallLog('avatar', 'post', 'F', err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.post = post;

async function put(req, res, next) {
    try {
        const livr_id = req.body.lid;
        const session_key = req.body.session_key;
        const ava_index = req.body.ava_index;        

        if(livr_id == null) {
            throw {name : 'NullLivrId', errorNum : 30002, message: 'livr id could not be null'}
        } else if(session_key == null) {
            throw {name : 'NullSessionKey', errorNum : 30003, message: 'session key could not be null'}
        } else if(ava_index == null) {
            throw {name : 'NullAvatar_Index', errorNum : 30004, message: 'avatar index could not be null'}
        }

        let result = await session_check.transactionExecute(livr_id, 'lid', session_key, 'put');

        if(result){
            result = await avatar.changeAvatar(livr_id, ava_index);
            res.status(200).json({ code: 2000 });
        } else {
            res.status(200).json({ code: 10000 });
        }
    } catch (err) {        
        await api_log.apiCallLog('avatar', 'put', 'F', err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.put = put;