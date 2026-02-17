const adminMiddleware = (req, res, next) => {
    // In a real app, we would fetch the user from DB to check role, or rely on token payload if trusted
    // For simplicity, let's assume the token payload has isAdmin or we fetch user.
    // However, fetching user is safer. Let's do that.
    const User = require('../models/User');
    User.findById(req.user.id).then(user => {
        if (user && user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Access Denied: Admin Only' });
        }
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
};

module.exports = adminMiddleware;
