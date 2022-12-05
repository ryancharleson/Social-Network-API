
const { Schema, model } = require('mongoose');


// This will be a schema requiring username, email, and a line to add thoughts and friends to username.
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        email: {
            type: String,
            required: "Email is Required",
            unique: true,
            // regex for matching email.
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+).([a-z\.]{2,6})$/]
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;