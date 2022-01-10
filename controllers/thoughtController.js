const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.status(200).json(thoughtData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const { thoughtText, username, userId } = req.body;
            if (!thoughtText || !username || !userId) {
                return res.status(500).json({ message: "Please provide thoughtText, username, and userId"});
            }
            const thoughtData = await Thought.create({ thoughtText, username });
            const userData = await User.findByIdAndUpdate(
                userId,
                { $push: { thoughts: thoughtData._id } },
                { new: true },
            );
            console.log(userData);
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}