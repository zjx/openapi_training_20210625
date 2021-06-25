const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');

//Schema具体定义，与之前GraphQL JS一样

// 1.定义schema
const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type User {
        id: ID!
        name: String
    }

    type Query {
        books: [Book],
        numberSix: Int!,
        numberSeven: Int!,
        user(id: ID!): User
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

const users = [
    {
        id: '1',
        name: 'Elizabeth Bennet'
    },
    {
        id: '2',
        name: 'Fitzwilliam Darcy'
    }
];


// 2.定义resolver
const resolvers = {
    // 所有Query都走这里
    Query: {
        books: () => books, numberSix() {
            return 6;
        },
        numberSeven() {
            return 7;
        },
        user(parent, args, context, info) {
            return users.find(user => user.id === args.id);
        }
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


