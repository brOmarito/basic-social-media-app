const { Schema, model } = require('mongoose');

const validateEmail = (email) => {
    const emailPattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailPattern.test(email);
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'The provided email is not valid'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends ? this.friends.length : 0;
    });

const User = model('user', userSchema);

module.exports = User;
