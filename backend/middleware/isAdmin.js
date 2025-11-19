module.exports = function (req, res, next) {
  // assumes auth middleware ran before and set req.user
  if (!req.user) return res.status(401).json({ msg: 'No user found' });
  // req.user should come from decoded token; include role/isAdmin when creating token
  if (req.user.isAdmin) return next();
  return res.status(403).json({ msg: 'Admin required' });
};
