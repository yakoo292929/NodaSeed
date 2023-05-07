const mongoose = require('mongoose');
const { Schema } = mongoose;

////////////////////////////////////////////////
// スキーマの定義
////////////////////////////////////////////////
const stockSchema = new Schema({
  largeclassname: {
    type: String,
    maxlength: [60, '大分類名は60文字以内で入力して下さい。'],
    trim: true,
  },
  middleclassname: {
    type: String,
    maxlength: [60, '中分類名は60文字以内で入力して下さい。'],
    trim: true,
  },
  locationname: {
    type: String,
    maxlength: [50, 'ロケーション名は50文字以内で入力して下さい。'],
    trim: true,
  },
  productname: {
    type: String,
    maxlength: [100, '商品名は100文字以内で入力して下さい。'],
    trim: true,
  },
  inventoryunitprice: {
    type: Number,
    min: [0, '0以下は入力できません']
  },
  inventoryquantity: {
    type: Number,
    min: [0, '0以下は入力できません']
  },
  stockprice: {
    type: Number,
    min: [0, '0以下は入力できません']
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

////////////////////////////////////////////////
// 外部利用の定義
////////////////////////////////////////////////
module.exports = mongoose.model('Stock', stockSchema);
