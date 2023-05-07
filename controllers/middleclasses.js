const Largeclass = require('../models/largeclass');
const Middleclass = require('../models/middleclass');


// 中分類 一覧画面
module.exports.index = async (req, res) => {
  const middleclasses = await Middleclass.find({},{},{ sort: { largeclassname:1, middleclassname:1 }});
  res.render('middleclasses/index', { middleclasses });
}

// 中分類 [検索]
module.exports.searchMiddleclass = async (req, res) => {
  const { q_middleclassname } = req.query;
  const middleclasses = await Middleclass.find({middleclassname:{ $regex: new RegExp(q_middleclassname, 'i') }},{},{ sort: { largeclassname:1, middleclassname:1 }});
  res.render('middleclasses/index', { middleclasses });
}

// 中分類 登録画面
module.exports.renderNewForm = async (req, res) => {
  const largeclasses = await Largeclass.find({});
  res.render('middleclasses/new', { largeclasses });
}

// 中分類 [登録]
module.exports.createMiddleclass = async (req, res) => {
  const middleclass = new Middleclass(req.body.middleclass);
  middleclass.author = req.user._id;
  await middleclass.save();
  req.flash('success', '新しい中分類を登録しました。');
  res.redirect('/middleclasses');
}

// 中分類 照会画面
module.exports.showMiddleclass = async (req, res) => {
  const middleclass = await Middleclass.findById(req.params.id).populate('author');
  // 存在チェック
  if (!middleclass) {
      req.flash('error', '中分類がみつかりませんでした。');
      return res.redirect('/middleclasses');
  }
  res.render('middleclasses/show', { middleclass });
}

// 中分類 編集画面
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const largeclasses = await Largeclass.find({});
  const middleclass = await Middleclass.findById(id);
  // 存在チェック
  if (!middleclass) {
      req.flash('error', '中分類がみつかりませんでした。');
      return res.redirect('/middleclasses');
  }
  res.render('middleclasses/edit', { largeclasses, middleclass });
}

// 中分類 [更新]
module.exports.updateMiddleclass = async (req, res) => {
  const { id } = req.params;
  await Middleclass.findByIdAndUpdate(id, {...req.body.middleclass });
  req.flash('success', '中分類を更新しました。');
  res.redirect('/middleclasses');
}

// 中分類 [削除]
module.exports.deleteMiddleclass = async (req, res) => {
  const { id } = req.params;
  await Middleclass.findByIdAndDelete(id);
  req.flash('success', '中分類を削除しました。');
  res.redirect('/middleclasses');
}
