const express = require('express');

const router = express.Router();

// routes
const auth = require('../routes/auth/controllers.js');
const category = require('../routes/main/category/controllers.js');
const appuser = require('../routes/appUser/controllers.js');
const rank = require('../routes/rank/controllers');
const content = require('../routes/content/controllers');
const cp = require('../routes/main/cp/controllers');
const store = require('../routes/main/store/controllers');
const search = require('../routes/search/controllers');
const getSingleRecord = require('../routes/getSingleRecord/controllers');
// helper or middleware
const tryCatch = require('../middleware/tryCatch');
const authMiddleware = require('../middleware/auth');
const awsLambda = require('../routes/awsLambda/Controllers');
const contentMulti = require('../routes/contentMulti/controllers');
const setImage = require('../routes/setImage/controllers');
const commoncode = require('../routes/commoncode/controllers');
const assetImage = require('../routes/assetImage/controllers');
const assetFile = require('../routes/assetFile/controllers');

router.route('/commoncode').get(tryCatch(commoncode.get));

router
  .route('/aws/lambdaCall/:token?')
  .get(tryCatch(awsLambda.get))
  .post(tryCatch(awsLambda.post));

router
  .route('/auth/:token?')
  .post(tryCatch(auth.login))
  .get(authMiddleware, tryCatch(auth.load));

router
  .route('/category/:params?')
  .post(tryCatch(category.post))
  .delete(tryCatch(category.deleteRecord))
  .put(tryCatch(category.put))
  .get(tryCatch(category.get));

router
  .route('/CP/:params?')
  .post(tryCatch(cp.post))
  .delete(tryCatch(cp.deleteRecord))
  .put(tryCatch(cp.put))
  .get(tryCatch(cp.get));

router
  .route('/store/:params?')
  .post(tryCatch(store.post))
  .delete(tryCatch(store.deleteRecord))
  .put(tryCatch(store.put))
  .get(tryCatch(store.get));

// @@ param_1 represents how many columns
router
  .route('/appuser/:params?')
  .post(appuser.post)
  .get(appuser.get)
  .put(appuser.put)
  .delete(appuser.deleteRecord);

// router
//   .route('/assetvod/:params?')
//   .get(tryCatch(assetvod.get));

router
  .route('/asset_upload.asset_image/:params?')
  .get(tryCatch(assetImage.get));

router.route('/asset_upload.asset_file/:params?').get(tryCatch(assetFile.get));

// router
//   .route('/assetfile/:params?')
//   .get(tryCatch(assetfile.get));

router.route('/statistics.rank/:params?').get(tryCatch(rank.get));

router
  .route('/setimage/:params?')
  .post(tryCatch(setImage.post))
  .delete(tryCatch(setImage.deleteRecord))
  .put(tryCatch(setImage.put))
  .get(tryCatch(setImage.get));

router.route('/content/:params?').get(tryCatch(content.get));
// !! need to make delete and update

router.route('/search/:route/:params?').get(tryCatch(search.get));

router
  .route('/getSingleRecord/:category/:id')
  .get(tryCatch(getSingleRecord.get));
router
  .route('/manipulateMultipleTables/content/:id?')
  .get(tryCatch(contentMulti.get))
  .post(tryCatch(contentMulti.post));

module.exports = router;
