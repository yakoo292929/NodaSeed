const Joi = require('joi');
const sanitizeHtml = require('sanitize-html');

////////////////////////////////////////////////
// sanitize-html関数
////////////////////////////////////////////////
// const extension = (joi) => ({
//   type: 'string',
//   base: joi.string(),
//   messages: {
//     'string.escapeHTML': '{{#label}} must not include HTML!'
//   },
//   rules: {
//     escapeHTML: {
//       validate(value, helpers) {
//         const clean = sanitizeHtml(value, {
//           allowedTags: [],
//           allowedAttributes: {},
//         });
//         if (clean !== value) return helpers.error('string.escapeHTML', { value })
//             return clean;
//       }
//     }
//   }
// });

// 拡張を含むJoi
// const Joi = BaseJoi.extend(extension);

////////////////////////////////////////////////
// Joiスキーマ定義 大分類マスター
////////////////////////////////////////////////
module.exports.largeclassSchema = Joi.object({
  largeclass: Joi.object({
    largeclassname: Joi.string().required(),
    image: Joi.string().allow(null,''),
    description: Joi.string().allow(null,'')
  }).required()
});

////////////////////////////////////////////////
// Joiスキーマ定義 中分類マスター
////////////////////////////////////////////////
module.exports.middleclassSchema = Joi.object({
  middleclass: Joi.object({
    largeclassname: Joi.string(),
    middleclassname: Joi.string().required(),
    image: Joi.string().allow(null,''),
    description: Joi.string().allow(null,'')
  }).required()
});

////////////////////////////////////////////////
// Joiスキーマ定義 ロケーションマスター
////////////////////////////////////////////////
module.exports.locationSchema = Joi.object({
  location: Joi.object({
    locationname: Joi.string().required(),
    image: Joi.string().allow(null,''),
    description: Joi.string().allow(null,'')
  }).required()
});

////////////////////////////////////////////////
// Joiスキーマ定義 商品マスター
////////////////////////////////////////////////
module.exports.productSchema = Joi.object({
  product: Joi.object({
    largeclassname: Joi.string().required(),
    middleclassname: Joi.string().required(),
    productname: Joi.string().required(),
    inventoryunitprice: Joi.number().min(0),
    unitsellingprice: Joi.number().min(0),
    image: Joi.string().allow(null,''),
    description: Joi.string().allow(null,'')
  }).required()
});

////////////////////////////////////////////////
// Joiスキーマ定義 在庫ファイル
////////////////////////////////////////////////
module.exports.stockSchema = Joi.object({
  stock: Joi.object({
    largeclassname: Joi.string().required(),
    middleclassname: Joi.string().required(),
    locationname: Joi.string().required(),
    productname: Joi.string().required(),
    inventoryunitprice: Joi.number().min(0),
    inventoryquantity: Joi.number().min(0),
    stockprice: Joi.number().min(0),
  }).required()
});
