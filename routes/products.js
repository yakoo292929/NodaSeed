const express = require('express');
const router = express.Router();
const products = require('../controllers/products');

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthorityProduct, validateProduct } = require('../middleware');


////////////////////////////////////////////////
// ルーティング
////////////////////////////////////////////////
// 商品 一覧画面
router.get('/', isLoggedIn, catchAsync(products.index));

// 商品 [検索]
router.get('/q', isLoggedIn, catchAsync(products.searchProduct));

// 商品 登録画面
router.get('/new', isLoggedIn, isAuthorityProduct, catchAsync(products.renderNewForm));

// 商品 [登録]
router.post('/', isLoggedIn, isAuthorityProduct, validateProduct, catchAsync(products.createProduct));

// 商品 照会画面
router.get('/:id/show', isLoggedIn, catchAsync(products.showProduct));

// 商品 編集画面
router.get('/:id/edit', isLoggedIn, isAuthorityProduct, catchAsync(products.renderEditForm));

// 商品 [更新]
router.put('/:id', isLoggedIn, isAuthorityProduct, validateProduct, catchAsync(products.updateProduct));

// 商品 [削除]
router.delete('/delete/:id', isLoggedIn, isAuthorityProduct, catchAsync(products.deleteProduct));

////////////////////////////////////////////////
// 外部利用の定義
////////////////////////////////////////////////
module.exports = router;
