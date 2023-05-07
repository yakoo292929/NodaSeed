const express = require('express');
const router = express.Router();

const middleclasses = require('../controllers/middleclasses');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthorityMiddleclass, validateMiddleclass } = require('../middleware');


////////////////////////////////////////////////
// ルーティング
////////////////////////////////////////////////
// 中分類 一覧画面
router.get('/', isLoggedIn, catchAsync(middleclasses.index));

// 中分類 [検索]
router.get('/q', isLoggedIn, catchAsync(middleclasses.searchMiddleclass));

// 中分類 登録画面
router.get('/new', isLoggedIn, isAuthorityMiddleclass, catchAsync(middleclasses.renderNewForm));

// 中分類 [登録]
router.post('/', isLoggedIn, isAuthorityMiddleclass, validateMiddleclass, catchAsync(middleclasses.createMiddleclass));

// 中分類 照会画面
router.get('/:id/show', isLoggedIn, catchAsync(middleclasses.showMiddleclass));

// 中分類 編集画面
router.get('/:id/edit', isLoggedIn, isAuthorityMiddleclass, catchAsync(middleclasses.renderEditForm));

// 中分類 [更新]
router.put('/:id', isLoggedIn, isAuthorityMiddleclass, validateMiddleclass, catchAsync(middleclasses.updateMiddleclass));

// 中分類 [削除]
router.delete('/delete/:id', isLoggedIn, isAuthorityMiddleclass, catchAsync(middleclasses.deleteMiddleclass));

////////////////////////////////////////////////
// 外部利用の定義
////////////////////////////////////////////////
module.exports = router;
