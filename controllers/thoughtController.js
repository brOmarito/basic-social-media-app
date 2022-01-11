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
    },

    async getThoughtById(req, res) {
        try {
            const thoughtData = await Thought.findById(
                req.params.id,
            ).select('-__v');
            if (!thoughtData) return res.status(404).json({ message: "No thought found with that ID"});
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThoughtById(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    runValidators: true,
                    new: true,
                },
            );
            if (!updatedThought) return res.status(404).json({ message: "No Thought found with that ID" });
            res.status(200).json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThoughtById(req, res) {
        try {
            const deletedThoughtData = await Thought.findByIdAndDelete(req.params.id);
            if (!deletedThoughtData) return res.status(404).json({ message: "No Thought found with that ID" })
            res.status(200).json(deletedThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { reactions: req.body } },
                {
                    runValidators: true,
                    new: true,
                }
            );
            if (!thoughtData) return res.status(404).json({ message: "No Thought found with that ID" });
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true },
            );
            res.status(200).json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}