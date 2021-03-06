require('dotenv').config({ path: './.env' });

// Database seeding
// const seedDB = require('./seeds');
// seedDB();

// User authentication
const jwt = require('jsonwebtoken');
const getUser = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, { issuer: 'COMP202-OHBA' }, 
    (err, decoded) => {
        if(err) { return null; }
        return { ...decoded };
    });
}

// Server setup
const { ApolloServer } = require('apollo-server-express'),
       typeDefs = require('./schema'),
       resolvers = require('./resolvers'),
       mongoClient = require('./config/mongoDB'),
      { Instructors, Students, Appointments } = require('./datasources'),
       express = require('express'),
       path = require('path'),
       cors = require('cors'),
      { logger } = require('./utils/logger');

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers && (req.headers.authorization || '');
        const user = getUser(token);
        logger(req, user);
        return { user };
    },
    dataSources: () => ({
        instructorAPI: new Instructors(mongoClient.db().collection('instructors')),
        appointmentAPI: new Appointments(mongoClient.db().collection('appointments')),
        studentAPI: new Students(mongoClient.db().collection('students'))
    })
});
server.applyMiddleware({ app, path: '/server' });

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server ready at ${server.graphqlPath}`);
});

  
