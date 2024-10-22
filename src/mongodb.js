const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);  

        const hashedPassword = await bcrypt.hash(this.password, salt); //turns the password random characters to prevent attacks from outside parties

        this.password = hashedPassword;

        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model("User", userSchema);

