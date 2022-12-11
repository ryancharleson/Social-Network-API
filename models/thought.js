
const { Schema, model, Types } = require('mongoose');


// Requiring date format function set up in Utils folder. This function will allow for time stamps on posts and reactions.
const dateFormat = require('../utils/dateFormat');


// Reactions are like comments and will be attached to the thoughts that are commented on
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String,
            minlength: 1,
            maxlength: 320,
            required: true,
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dateFormat(date)
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }

);


// Thought Schema is like a post which will be attached to a username.
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            minlength: 1,
            maxlength: 320,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dateFormat(date)
        },

        username: {
            type: String,
            required: true
        },

        reactions: [reactionSchema]
    },
    {

        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);



thoughtSchema 
.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;