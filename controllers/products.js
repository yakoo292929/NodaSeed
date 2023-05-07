const Largeclass = require('../models/largeclass');
const Middleclass = require('../models/middleclass');
const Product = require('../models/product');


// 商品 一覧画面
module.exports.index = async (req, res) => {
  const products = await Product.find({},{},{ sort: { largeclassname:1, productname:1 }});
  res.render('products/index', { products });
}

// 商品 [検索]
module.exports.searchProduct = async (req, res) => {
  const { q_middleclassname, q_productname } = req.query;
  const products = await Product.find({middleclassname:{ $regex: new RegExp(q_middleclassname, 'i') }, productname:{ $regex: new RegExp(q_productname, 'i') }},{},{ sort: { largeclassname:1, productname:1 }});
  res.render('products/index', { products });
}

// 商品 登録画面
module.exports.renderNewForm = async (req, res) => {
  const largeclasses = await Largeclass.find({});
  const middleclasses = await Middleclass.find({});
  res.render('products/new', { largeclasses, middleclasses });
}

// 商品 [登録]
module.exports.createProduct = async (req, res) => {
  const product = new Product(req.body.product);
  product.author = req.user._id;
  await product.save();
  req.flash('success', '新しい商品を登録しました。');
  res.redirect('/products');
}

// 商品 照会画面
module.exports.showProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('author');
  // 存在チェック
  if (!product) {
      req.flash('error', '商品がみつかりませんでした。');
      return res.redirect('/products');
  }
  res.render('products/show', { product });
}

// 商品 編集画面
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const largeclasses = await Largeclass.find({});
  const middleclasses = await Middleclass.find({});
  const product = await Product.findById(id);
  // 存在チェック
  if (!product) {
      req.flash('error', '商品がみつかりませんでした。');
      return res.redirect('/products');
  }
  res.render('products/edit', { largeclasses, middleclasses, product });
}

// 商品 [更新]
module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, {...req.body.product });
  req.flash('success', '商品を更新しました。');
  res.redirect('/products');
}

// 商品 [削除]
module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  req.flash('success', '商品を削除しました。');
  res.redirect('/products');
}
