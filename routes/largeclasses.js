const express = require('express');
const router = express.Router();

const largeclasses = require('../controllers/largeclasses');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthorityLargeclass, validateLargeclass } = require('../middleware');


////////////////////////////////////////////////
// ルーティング
////////////////////////////////////////////////
// 大分類 一覧画面
router.get('/', isLoggedIn, catchAsync(largeclasses.index));

// 大分類 登録画面
router.get('/new', isLoggedIn, isAuthorityLargeclass, catchAsync(largeclasses.renderNewForm));

// 大分類 [登録]
router.post('/', isLoggedIn, isAuthorityLargeclass, validateLargeclass, catchAsync(largeclasses.createLargeclass));

// 大分類 照会画面
router.get('/:id/show', isLoggedIn, catchAsync(largeclasses.showLargeclass));

// 大分類 編集画面
router.get('/:id/edit', isLoggedIn, isAuthorityLargeclass, catchAsync(largeclasses.renderEditForm));

// 大分類 [更新]
router.put('/:id', isLoggedIn, isAuthorityLargeclass, validateLargeclass, catchAsync(largeclasses.updateLargeclass));

// 大分類 [削除]
router.delete('/delete/:id', isLoggedIn, isAuthorityLargeclass, catchAsync(largeclasses.deleteLargeclass));

////////////////////////////////////////////////
// 外部利用の定義
////////////////////////////////////////////////
module.exports = router;
