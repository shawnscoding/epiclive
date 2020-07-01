const Joi = require('joi');

module.exports.insertValidator = Joi.object().keys({
  companyno: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.any().required(),
  email: Joi.string().required(),
  address1: Joi.string().required(),
});

module.exports.deleteValidator = Joi.object().keys({
  id: Joi.string().required(),
});

module.exports.updateValidator = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.any().required(),
  email: Joi.string().required(),
  address1: Joi.string().required(),
});
