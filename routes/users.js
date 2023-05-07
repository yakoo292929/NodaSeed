const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthorityUser } = require('../middleware');


////////////////////////////////////////////////
// ルーティング
////////////////////////////////////////////////
// ユーザー登録画面
router.get('/register', users.renderRegister);

// ユーザー登録
router.post('/register', users.register);

// ログイン画面
router.get('/login', users.renderLogin);

// ログイン
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: 'login' }), users.login);

// ログアウト
router.get('/logout', users.logout);

// ユーザー 一覧画面
router.get('/', isLoggedIn, catchAsync(users.index));

// ユーザー 照会画面
router.get('/:id/show', isLoggedIn, catchAsync(users.showUser));

// ユーザー 編集画面
router.get('/:id/edit', isLoggedIn, isAuthorityUser, catchAsync(users.renderEditForm));

// ユーザー [更新]
router.put('/:id', isLoggedIn, isAuthorityUser, catchAsync(users.updateUser));

// ユーザー [削除]
router.delete('/delete/:id', isLoggedIn, isAuthorityUser, catchAsync(users.deleteUser));

////////////////////////////////////////////////
// 外部利用の定義
////////////////////////////////////////////////
module.exports = router;
