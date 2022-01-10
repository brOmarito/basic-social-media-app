const router = require('express').Router();
const {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

module.exports = router;
