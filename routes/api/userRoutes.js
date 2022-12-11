const router = require('express').Router();

const {
    createUser,
    getUsers,
    updateUser,
    getSingleUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;