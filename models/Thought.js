const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction');

const formatDate = (date) => {
    if (!date) return date;
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date().now(),
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
