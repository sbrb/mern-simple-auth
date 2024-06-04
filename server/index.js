const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./src/schemas');
const resolvers = require('./src/resolvers');
const authentication = require('./src/utils/auth');
require('dotenv').config();

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const context = authentication(req);
            return context;
        },
    });

    await server.listen({ port: 4000 });
    console.log(`Server ready at http://localhost:4000/`);
};

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected');
        startServer();
    })
    .catch(err => console.error(err));
