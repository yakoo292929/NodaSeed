const Location = require('../models/location');


// ロケーション 一覧画面
module.exports.index = async (req, res) => {
  const locations = await Location.find({});
  res.render('locations/index', { locations });
}

// ロケーション 登録画面
module.exports.renderNewForm = async (req, res) => {
  res.render('locations/new');
}

// ロケーション [登録]
module.exports.createLocation = async (req, res) => {
  const location = new Location(req.body.location);
  location.author = req.user._id;
  await location.save();
  req.flash('success', '新しいロケーションを登録しました。');
  res.redirect('/locations');
}

// ロケーション 照会画面
module.exports.showLocation = async (req, res) => {
  const location = await Location.findById(req.params.id).populate('author');
  // 存在チェック
  if (!location) {
      req.flash('error', 'ロケーションがみつかりませんでした。');
      return res.redirect('/largeclasses');
  }
  res.render('locations/show', { location });
}

// ロケーション 編集画面
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const location = await Location.findById(id);
  // 存在チェック
  if (!location) {
      req.flash('error', 'ロケーションがみつかりませんでした。');
      return res.redirect('/locations');
  }
  res.render('locations/edit', { location });
}

// ロケーション [更新]
module.exports.updateLocation = async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndUpdate(id, {...req.body.location });
  req.flash('success', 'ロケーションを更新しました。');
  res.redirect('/locations');
}

// ロケーション [削除]
module.exports.deleteLocation = async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndDelete(id);
  req.flash('success', 'ロケーションを削除しました。');
  res.redirect('/locations');
}
