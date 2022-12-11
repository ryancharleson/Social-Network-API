const { User } = require('../models');

module.exports = {


    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) => !user ? res.status(404).json({ message: 'No user found with that ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err.message));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete(req.body)
            .then((user) => !user ? res.status(404).json({ message: 'No user found with that ID' })
                : User.deleteOne({ _id: { $in: user } })
            )
            .then(() => res.json({ message: 'User deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(req.body)
        .then((user) => !user ? res.status(404).json({ message: "No user found with that ID"})
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err.message));
    },

    deleteFriend(req, res) {
        User.findByIdAndUpdate( req.params.userId , { $pull: { friends: req.params.friendId } }, { new: true, runValidators: true} 
            )
            .then(() => res.json({ message: 'Success' }))
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findByIdAndUpdate(req.params.userId , { $addToSet: { friends: req.params.friendId } }, { new: true, runValidators: true}
            )
            .then(() => res.json({ message: 'Success' }))
            .catch((err) => res.status(500).json(err));

    }

};