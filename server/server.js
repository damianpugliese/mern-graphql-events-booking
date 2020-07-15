const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const config = require('./config/config');
const isAuthenticated = require('./middlewares/isAuthenticated');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

// App & Port
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Is Authenticated middleware
app.use(isAuthenticated);

// GraphQL middleware
app.use('/graphql',
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true
    }));

// MongoDB Connect
const db = config.MONGO_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`MongoDB connected...`);
    })
    .catch(err => console.log(err));

// Serve React Frontend
if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

}

//  Server Init
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});