const mongoose = require('mongoose');
const { Schema } = mongoose;

////////////////////////////////////////////////
// スキーマの定義
////////////////////////////////////////////////
const middleclassSchema = new Schema({
  largeclassname: {
    type: String,
    maxlength: [60, '大分類名は60文字以内で入力して下さい。'],
    trim: true,
  },
  middleclassname: {
    type: String,
    unique: [true, '同じ中分類名があります。'],
    maxlength: [60, '中分類名は60文字以内で入力して下さい。'],
    trim: true,
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
module.exports = mongoose.model('Middleclass', middleclassSchema);
