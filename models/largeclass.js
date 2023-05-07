const mongoose = require('mongoose');
const { Schema } = mongoose;

////////////////////////////////////////////////
// スキーマの定義
////////////////////////////////////////////////
const largeclassSchema = new Schema({
  largeclassname: {
    type: String,
    unique: [true, '同じ大分類名があります。'],
    maxlength: [60, '大分類名は60文字以内で入力して下さい。'],
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
module.exports = mongoose.model('Largeclass', largeclassSchema);
