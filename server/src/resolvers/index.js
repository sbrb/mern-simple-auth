const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) throw new Error('Not authenticated');

            try {
                const user = await User.findById(context.user.id);
                if (!user) throw new Error('User not found');
                return user;
            } catch (error) {
                console.error('Error fetching user:', error);
                throw new Error('Error fetching user');
            }
        },
    },
    Mutation: {
        register: async (_, { name, email, password }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error('User already exists');

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ name, email, password: hashedPassword });
            await user.save();

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Invalid password');

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            return { token, user };
        },
    },
};

module.exports = resolvers;
