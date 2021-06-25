const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');

// 1.定义schema
const typeDefs = gql`
    type Book {
        title: String
        author: String
    }
    type Query {
        books: [Book]
    }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

// 2.定义resolver
const resolvers = {
    // 所有Query都走这里
    Query: {
        books: () => books,
    },
};


const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// 3.将apollo-server与express集合到一起
server.applyMiddleware({app});

app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
});

app.listen({port: 4000});
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);


