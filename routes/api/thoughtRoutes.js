const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/throughtController');

router.route('/').get(getThought).post(createThought);
router.route('/:id').get(getSingleThought).delete(deleteThought).put(updateThought);
router.route('/:thoughtId/reaction').post(createReaction);
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction)

module.exports = router;