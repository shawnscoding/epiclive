const api_log = require('../db_apis/api_log.js');
const session_check = require('../db_apis/session_check.js');

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
        
        const log = await api_log.apiCallLog('session_lid', 'get', 'T', {});
        
        console.log(result);

        if(result){
            res.status(200).json({ code: 2000 });
        } else {
            res.status(200).json({ code: 10000 });
        }
    } catch (err) {               
        await api_log.apiCallLog('session_lid', 'get', 'F', err);
        res.status(500).json({ code: 5000, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.get = get;