const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

////////////////////////////////////////////////
// スキーマの定義
////////////////////////////////////////////////
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'emailを入力して下さい。'],
    unique: [true, '既に同じemailが登録されています。'],
  },
  authority: {
    type: String,
  },
});

////////////////////////////////////////////////
// プラグインの定義
////////////////////////////////////////////////
// passportLocalMongooseがユーザー・パスワード(ハッシュ/salt情報)が
// スキーマに自動的に定義される
userSchema.plugin(passportLocalMongoose, {
    errorMessages: {
      UserExistsError: 'そのユーザー名はすでに使われています。',
      MissingPasswordError: 'パスワードを入力してください。',
      AttemptTooSoonError: 'アカウントがロックされてます。時間をあけて再度試してください。',
      TooManyAttemptsError: 'ログインの失敗が続いたため、アカウントをロックしました。',
      NoSaltValueStoredError: '認証ができませんでした。',
      IncorrectPasswordError: 'パスワードまたはユーザー名が間違っています。',
      IncorrectUsernameError: 'パスワードまたはユーザー名が間違っています。',
  }
});

////////////////////////////////////////////////
// 外部利用の定義
////////////////////////////////////////////////
module.exports = mongoose.model('User', userSchema);
