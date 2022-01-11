const router = require('express').Router();
const {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
} = require('../../controllers/userController');
const {
    addFriend,
    removeFriend,
} = require('../../controllers/friendController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
