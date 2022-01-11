const { User } = require('../models');

module.exports = {
    async addFriend(req, res) {
        try {
            const userData = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true },
            );
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const userData = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true },
            );
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}