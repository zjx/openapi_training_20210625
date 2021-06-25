const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');

//Schema之Resolvers-解析链,Parent参数，Context参数

const libraries = [
    {
        branch: 'downtown'
    },
    {
        branch: 'riverside'
    },
];

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
        branch: 'riverside'
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
        branch: 'downtown'
    },
];


// 1.定义schema
const typeDefs = gql`
    # 一个图书馆有branch 和 books
    type Library {
        branch: String!
        books: [Book!]
    }

    # 一本图书有title 和 author
    type Book {
        title: String!
        author: Author!
    }

    # 作者有名称
    type Author {
        name: String!
    }

    type Query {
        libraries: [Library]
    }
`;

// 2.定义resolver
const resolvers = {
    Query: {
        libraries(parent, args, context) {
            console.log(context);

            // 返回图书馆实体数组
            return libraries;
        }
    },
    Library: {
        books(parent, args, context) {
            console.log(context);

            // parent这里是指图书馆，通过图书馆的branch查找图书馆下的书籍
            return books.filter(book => book.branch === parent.branch);
        }
    },
    Book: {
        author(parent, args, context) {
            console.log(context);

            return {
                // parent这里是指图书，直接返回图书的author
                name: parent.author
            };
        }
    }
};


const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({// 返回对象，自定义数据，后续的每个resolver都可用到
        foo:'bar'
    })
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


