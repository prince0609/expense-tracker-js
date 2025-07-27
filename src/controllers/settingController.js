const User = require('../models/User');

const showSettings = (req, res) => {
          const user = req.session.user;
          res.render('settings', {user});
}

const editPreferences = async (req, res) => {
  const userId = req.session.user;
  let { categoryList, defaultCategory, defaultNote } = req.body;
  categoryList = Array.from(new Set([...categoryList, defaultCategory]));

  try {
    await User.findByIdAndUpdate(userId, {
      'settings.categoryList': categoryList,
      'settings.defaultCategory': defaultCategory,
      'settings.defaultNote': defaultNote
    });
    req.session.user = await User.findById(userId); // Update session with new settings
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}

const editProfile = async (req, res) => {
  const userId = req.session.user;
  const { name } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { name });
    req.session.user = await User.findById(userId); // Update session with new name
    res.redirect('/api/users/settings');
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}

module.exports = {showSettings, editPreferences, editProfile};