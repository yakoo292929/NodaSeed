const mongoose = require('mongoose');
const { Schema } = mongoose;

////////////////////////////////////////////////
// スキーマの定義
////////////////////////////////////////////////
const productSchema = new Schema({
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
  productname: {
    type: String,
    unique: [true, '同じ商品名があります。'],
    maxlength: [100, '商品名は100文字以内で入力して下さい。'],
    trim: true,
  },
  inventoryunitprice: {
    type: Number,
    min: [0, '0以下は入力できません']
  },
  unitsellingprice: {
    type: Number,
    min: [0, '0以下は入力できません']
  },
  image: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

////////////////////////////////////////////////
// 外部利用の定義
////////////////////////////////////////////////
module.exports = mongoose.model('Product', productSchema);
