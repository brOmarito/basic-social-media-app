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

    async updateUserById(req, res) {
        try {
            const { username, email } = req.body;
            if (!username && !email) return res.status(500).json({ message: "Please provide either an email or username to update" });
            const updateObj = {};
            if (username) updateObj.username = username;
            if (email) updateObj.email = email;
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
                updateObj,
                {
                    new: true,
                    runValidators: true,
                },
            ).select('-__v');
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUserById(req, res) {
        try {
            const userDeletedData = await User.findByIdAndDelete(req.params.id);
            const notFoundMess = { message: "No user found with that ID" };
            if (!userDeletedData) return res.status(404).json(notFoundMess);
            console.log(userDeletedData.username);
            const deletedData = { deletedUser: userDeletedData };
            const thoughtDeletedData = await Thought.deleteMany({ username: userDeletedData.username });
            if (thoughtDeletedData) deletedData.thoughtsDeleted = thoughtDeletedData;
            res.status(200).json(deletedData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}