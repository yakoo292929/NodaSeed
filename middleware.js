const ExpressError = require('./utils/ExpressError');

const Largeclass = require('./models/largeclass');
const Middleclass = require('./models/middleclass');
const Location = require('./models/location');
const Product = require('./models/product');
const Stock = require('./models/stock');

const {
  largeclassSchema,
  middleclassSchema,
  locationSchema,
  productSchema,
  stockSchema
 } = require('./schemas');

 
////////////////////////////////////////////////
// ミドルウェア
////////////////////////////////////////////////

// -------------------------------------------------------------------------------- //

// ログインしているかどうかの判断
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.flash('error', 'ログインしてください');
      return res.redirect('/login');
  }
  next();
}

// -------------------------------------------------------------------------------- //

// 大分類バリデーション
module.exports.validateLargeclass = (req, res, next) => {
  const { error } = largeclassSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(detail => detail.message).join(',');
      throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

// 中分類バリデーション
module.exports.validateMiddleclass = (req, res, next) => {
  const { error } = middleclassSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(detail => detail.message).join(',');
      throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

// ロケーションバリデーション
module.exports.validateLocation = (req, res, next) => {
  const { error } = locationSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(detail => detail.message).join(',');
      throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

// 商品バリデーション
module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(detail => detail.message).join(',');
      throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

// 在庫バリデーション
module.exports.validateStock = (req, res, next) => {
  const { error } = stockSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(detail => detail.message).join(',');
      throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

// -------------------------------------------------------------------------------- //

// 大分類 更新権限チェック
module.exports.isAuthorityLargeclass = async (req, res, next) => {
  const { id } = req.params;
  const user = res.locals.currentUser;
  if (user.authority !== '99') {
      req.flash('error', 'その操作の権限がありません');
      return res.redirect(`/largeclasses/${id}`)
  }
  next();
}

// 中分類 更新権限チェック
module.exports.isAuthorityMiddleclass = async (req, res, next) => {
  const { id } = req.params;
  const user = res.locals.currentUser;
  if (user.authority !== '99') {
      req.flash('error', 'その操作の権限がありません');
      return res.redirect(`/middleclasses/${id}`)
  }
  next();
}

// ロケーション 更新権限チェック
module.exports.isAuthorityLocation = async (req, res, next) => {
  const { id } = req.params;
  const user = res.locals.currentUser;
  if (user.authority !== '99') {
      req.flash('error', 'その操作の権限がありません');
      return res.redirect(`/locations/${id}`)
  }
  next();
}

// 商品 更新権限チェック
module.exports.isAuthorityProduct = async (req, res, next) => {
  const { id } = req.params;
  const user = res.locals.currentUser;
  if (user.authority !== '99') {
      req.flash('error', 'その操作の権限がありません');
      return res.redirect(`/products/${id}`)
  }
  next();
}

// ユーザー 更新権限チェック
module.exports.isAuthorityUser = async (req, res, next) => {
  const { id } = req.params;
  const user = res.locals.currentUser;
  if (user.authority !== '99') {
    req.flash('error', 'その操作の権限がありません');
    return res.redirect(`/users/${id}`)
  }
  next();
}
// -------------------------------------------------------------------------------- //
