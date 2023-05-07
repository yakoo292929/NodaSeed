const express = require('express');
const router = express.Router();
const stocks = require('../controllers/stocks');

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateStock } = require('../middleware');


////////////////////////////////////////////////
// ルーティング
////////////////////////////////////////////////
// 在庫 一覧画面
router.get('/', isLoggedIn, catchAsync(stocks.index));

// 在庫 [検索]
router.get('/q', isLoggedIn, catchAsync(stocks.searchStock));

// 在庫 登録画面
router.get('/new', isLoggedIn, catchAsync(stocks.renderNewForm));

// 在庫 [登録]
router.post('/', isLoggedIn, validateStock, catchAsync(stocks.createStock));

// 在庫 照会画面
router.get('/:id', isLoggedIn, catchAsync(stocks.showStock));

// 在庫 編集画面
router.get('/:id/edit', isLoggedIn, catchAsync(stocks.renderEditForm));

// 在庫 [更新]
router.put('/:id', isLoggedIn, validateStock, catchAsync(stocks.updateStock));

// 在庫 [削除]
router.delete('/delete/:id', isLoggedIn, catchAsync(stocks.deleteStock));

////////////////////////////////////////////////
// 外部利用の定義
////////////////////////////////////////////////
module.exports = router;
