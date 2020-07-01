const Joi = require('joi');

module.exports.select = Joi.object().keys({
  title: Joi.string().required(),
  genre_list: Joi.string().required(),
  priority: Joi.any().required(),
  usageyn: Joi.string().required(),
});

module.exports.insertValidator = Joi.object().keys({
  title: Joi.string().required(),
  genre_list: Joi.string().required(),
  priority: Joi.any().required(),
  usageyn: Joi.string().required(),
});

module.exports.deleteValidator = Joi.object().keys({
  id: Joi.string().required(),
});

module.exports.updateValidator = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  genre_list: Joi.string().required(),
  priority: Joi.any().required(),
  usageyn: Joi.string().required(),
});
