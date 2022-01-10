const { json } = require('express/lib/response');
const { Thought, User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const userData = await User.find();
            res.status(200).json(userData);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            // const { username, email } = req.body;
            // if (!username || !email)
            const userData = await User.create(req.body);
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id })
                .select('-__v')
                .populate('thoughts', 'friends');
            if (!userData) return res.status(404).json({ message: "No user found with that ID"});
            res.status(200).json(userData);
        } catch (err) {
            console.error(err)
            res.status(500).json(err);
        }
    },
}