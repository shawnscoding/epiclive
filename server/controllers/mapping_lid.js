const api_log = require('../db_apis/api_log.js');
const session_check = require('../db_apis/session_check.js');
const mapping_lid = require('../db_apis/mapping_lid.js');

async function get(req, res, next) {
    try {
        let jstr = req.query.jstr;
        const livr_id = req.query.lid;
        const session_key = req.query.session_key;
        const cnt = req.query.cnt;

        //jstr = '[{"id":"lsb"},{"id":"aaa"},{"id":"lcb"}]';

        if(jstr == null) {
            throw {name : 'NullOculusIdList', errorNum : 30010, message: 'oculus id list could not be null'}
        } else if(livr_id == null) {
            throw {name : 'NullLivrId', errorNum : 30002, message: 'livr id could not be null'}
        } else if(session_key == null) {
            throw {name : 'NullSessionKey', errorNum : 30003, message: 'session key could not be null'}
        }

        let result = await session_check.transactionExecute(livr_id, 'lid', session_key);

        if(result){
            result = await mapping_lid.transactionExecute(jstr, livr_id, cnt);
            res.status(200).json(result);
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