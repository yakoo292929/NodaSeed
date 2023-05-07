const express = require('express');
const router = express.Router();

const locations = require('../controllers/locations');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthorityLocation, validateLocation } = require('../middleware');


////////////////////////////////////////////////
// ルーティング
////////////////////////////////////////////////
// ロケーション 一覧画面
router.get('/', isLoggedIn, catchAsync(locations.index));

// ロケーション 登録画面
router.get('/new', isLoggedIn, isAuthorityLocation, catchAsync(locations.renderNewForm));

// ロケーション [登録]
router.post('/', isLoggedIn, isAuthorityLocation, validateLocation, catchAsync(locations.createLocation));

// ロケーション 照会画面
router.get('/:id/show', isLoggedIn, catchAsync(locations.showLocation));

// ロケーション 編集画面
router.get('/:id/edit', isLoggedIn, isAuthorityLocation, catchAsync(locations.renderEditForm));

// ロケーション [更新]
router.put('/:id', isLoggedIn, isAuthorityLocation, validateLocation, catchAsync(locations.updateLocation));

// ロケーション [削除]
router.delete('/delete/:id', isLoggedIn, isAuthorityLocation, catchAsync(locations.deleteLocation));

////////////////////////////////////////////////
// 外部利用の定義
////////////////////////////////////////////////
module.exports = router;
