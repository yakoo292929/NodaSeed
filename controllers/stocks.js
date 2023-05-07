const Largeclass = require('../models/largeclass');
const Middleclass = require('../models/middleclass');
const Location = require('../models/location');
const Product = require('../models/product');
const Stock = require('../models/stock');


// 在庫 一覧画面
module.exports.index = async (req, res) => {
  const stocks = await Stock.find({},{},{ sort: { locationname:1, productname:1 }} );
  res.render('stocks/index', { stocks });
}

// 在庫 [検索]
module.exports.searchStock = async (req, res) => {
  const {q_locationname, q_productname} = req.query;
  const stocks = await Stock.find({locationname:{ $regex: new RegExp(q_locationname, 'i') }, productname:{ $regex: new RegExp(q_productname, 'i') }},{},{ sort: { locationname:1, productname:1 }});
  res.render('stocks/index', { stocks });
}

// 在庫 登録画面
module.exports.renderNewForm = async (req, res) => {
  const largeclasses = await Largeclass.find({});
  const middleclasses = await Middleclass.find({});
  const locations = await Location.find({});
  const products = await Product.find({});
  res.render('stocks/new', { largeclasses, middleclasses, locations, products });
}

// 在庫 [登録]
module.exports.createStock = async (req, res) => {
  const stock = new Stock(req.body.stock);
  stock.author = req.user._id;
  await stock.save();
  req.flash('success', '新しい在庫を登録しました。');
  res.redirect('/stocks');
}

// 在庫 照会画面
module.exports.showStock = async (req, res) => {
  const stock = await Stock.findById(req.params.id).populate('author');
  // 存在チェック
  if (!stock) {
      req.flash('error', '在庫がみつかりませんでした。');
      return res.redirect('/stocks');
  }
  res.render('stocks/show', { stock });
}

// 在庫 編集画面
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const locations = await Location.find({});
  const products = await Product.find({});
  const stock = await Stock.findById(id);
  // 存在チェック
  if (!stock) {
      req.flash('error', '在庫がみつかりませんでした。');
      return res.redirect('/stocks');
  }
  res.render('stocks/edit', { locations, products, stock });
}

// 在庫 [更新]
module.exports.updateStock = async (req, res) => {
  const { id } = req.params;
  await Stock.findByIdAndUpdate(id, {...req.body.stock });
  req.flash('success', '在庫を更新しました。');
  res.redirect('/stocks');
}

// 在庫 [削除]
module.exports.deleteStock = async (req, res) => {
  const { id } = req.params;
  await Stock.findByIdAndDelete(id);
  req.flash('success', '在庫を削除しました。');
  res.redirect('/stocks');
}
