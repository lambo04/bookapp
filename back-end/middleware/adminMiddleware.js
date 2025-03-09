const authMiddleware = require('./authMiddleware');

const adminMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied, admin role required' });
    }
  });
};

module.exports = adminMiddleware;
