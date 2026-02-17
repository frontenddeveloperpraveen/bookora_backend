const User = require('../models/User');
const Book = require('../models/Book');

exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.toggleWishlist = async (req, res) => {
    const { bookId } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const index = user.wishlist.indexOf(bookId);

        if (index === -1) {
            user.wishlist.push(bookId);
        } else {
            user.wishlist.splice(index, 1);
        }

        await user.save();
        
        // Return updated wishlist populated
        const updatedUser = await User.findById(req.user.id).populate('wishlist');
        res.json(updatedUser.wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
