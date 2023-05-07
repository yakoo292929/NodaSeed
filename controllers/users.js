const User = require('../models/user');

// ユーザー登録画面
module.exports.renderRegister = (req, res) => {
  res.render('users/register');
}

// ユーザー登録
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, authority, password } = req.body;
    const user = new User({ username, email, authority});
    const registerdUser = await User.register(user, password);
    req.login(registerdUser, err => {
      if(err) return next(err);
      req.flash('success', 'NodaSeedへようこそ!!');
      res.redirect('/products');
    });
  } catch(e) {
    req.flash('error', e.message);
    res.redirect('/register');
  }
}

// ログイン画面
module.exports.renderLogin = (req, res) => {
  res.render('users/login');
}

// ログイン
module.exports.login = (req, res) => {
  req.flash('success', 'おかえりなさい!!');
  // 初期画面
  const redirectUrl = req.session.returnTo || 'stocks';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
}

// ログアウト
module.exports.logout = async (req, res, next) => {
  req.session.returnTo = req.originalUrl;
  try {
    req.logout(err => {
      if(err) return next(err);
      req.flash('success', 'ログアウトしました');
      res.redirect('/login');
    });
  } catch(e) {
    req.flash('error', e.message);
    res.redirect('/login');
  }
}

// ユーザー 一覧画面
module.exports.index = async (req, res) => {
  const users = await User.find({},{},{ sort: { username:1 }} );
  res.render('users/index', { users });
}

// ユーザー 照会画面
module.exports.showUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  // 存在チェック
  if (!user) {
      req.flash('error', 'ユーザーがみつかりませんでした。');
      return res.redirect('/users');
  }
  res.render('users/show', { user });
}

// ユーザー 編集画面
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  // 存在チェック
  if (!user) {
      req.flash('error', 'ユーザーがみつかりませんでした。');
      return res.redirect('/users');
  }
  res.render('users/edit', { user });
}

// ユーザー [更新]
module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, {...req.body.user });
  req.flash('success', 'ユーザーを更新しました。');
  res.redirect('/users');
}

// ユーザー [削除]
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  req.flash('success', 'ユーザーを削除しました。');
  res.redirect('/users');
}
