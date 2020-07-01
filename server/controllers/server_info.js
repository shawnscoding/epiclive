async function get(req, res, next) {
    try {
        const result = {server : "local"};

        res.status(200).json(result);
    } catch (err) {            
        next(err);
    }
}
  
module.exports.get = get;