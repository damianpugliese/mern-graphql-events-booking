const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
    createUser: async args => {
        try {
            const user = await User.findOne({ email: args.userInput.email })
            if (user) {
                throw new Error('User already exists')
            }
            const hashPassword = await bcrypt.hash(args.userInput.password, 12)
            const newUser = new User({
                username: args.userInput.username,
                email: args.userInput.email,
                password: hashPassword
            });
            const userSave = await newUser.save();
            return { ...userSave._doc, password: null };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User does not exist')
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }
        const token = jwt.sign({
            userId: user.id,
            email: user.email
        },
            'SecretKey',
            { expiresIn: '1h' }
        );
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    }
};