const Largeclass = require('../models/largeclass');


// 大分類 一覧画面
module.exports.index = async (req, res) => {
  const largeclasses = await Largeclass.find({});
  res.render('largeclasses/index', { largeclasses });
}

// 大分類 登録画面
module.exports.renderNewForm = async (req, res) => {
  res.render('largeclasses/new');
}

// 大分類 [登録]
module.exports.createLargeclass = async (req, res) => {
  const largeclass = new Largeclass(req.body.largeclass);
  largeclass.author = req.user._id;
  await largeclass.save();
  req.flash('success', '新しい大分類を登録しました。');
  res.redirect('/largeclasses');
}

// 大分類 照会画面
module.exports.showLargeclass = async (req, res) => {
  const largeclass = await Largeclass.findById(req.params.id).populate('author');
  // 存在チェック
  if (!largeclass) {
      req.flash('error', '大分類がみつかりませんでした。');
      return res.redirect('/largeclasses');
  }
  res.render('largeclasses/show', { largeclass });
}

// 大分類 編集画面
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const largeclass = await Largeclass.findById(id);
  // 存在チェック
  if (!largeclass) {
      req.flash('error', '大分類がみつかりませんでした。');
      return res.redirect('/largeclasses');
  }
  res.render('largeclasses/edit', { largeclass });
}

// 大分類 [更新]
module.exports.updateLargeclass = async (req, res) => {
  const { id } = req.params;
  await Largeclass.findByIdAndUpdate(id, {...req.body.largeclass });
  req.flash('success', '大分類を更新しました。');
  res.redirect('/largeclasses');
}

// 大分類 [削除]
module.exports.deleteLargeclass = async (req, res) => {
  const { id } = req.params;
  await Largeclass.findByIdAndDelete(id);
  req.flash('success', '大分類を削除しました。');
  res.redirect('/largeclasses');
}
