const mongoose = require('mongoose');
const { Schema } = mongoose;

////////////////////////////////////////////////
// スキーマの定義
////////////////////////////////////////////////
const locationSchema = new Schema({
  locationname: {
    type: String,
    unique: [true, '同じロケーション名があります。'],
    maxlength: [50, 'ロケーション名は50文字以内で入力して下さい。'],
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
module.exports = mongoose.model('Location', locationSchema);
