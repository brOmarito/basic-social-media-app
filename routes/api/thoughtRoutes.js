const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getThoughtById,
    deleteThoughtById,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController')

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:id')
    .get(getThoughtById)
    .delete(deleteThoughtById);

router.route('/:id/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
