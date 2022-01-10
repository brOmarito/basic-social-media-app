const router = require('express').Router();
const {
    getUsers,
    createUser,
    getUserById,
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById);

module.exports = router;
