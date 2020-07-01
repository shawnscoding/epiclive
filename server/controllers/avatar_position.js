const avatar_position = require('../db_apis/avatar_position.js');
const api_log = require('../db_apis/api_log.js');

async function get(req, res, next) {
    try {
        const result = await avatar_position.transactionExecute();
        
        const log = await api_log.apiCallLog('avatar_position', 'get', 'T', {});

        res.status(200).json(result);
    } catch (err) {              
        await api_log.apiCallLog('avatar_position', 'get', 'F', err);
        res.status(500).json({ code: 500, err_code: err.errorNum, err_msg : err.message });

        next(err);
    }
}
  
module.exports.get = get;