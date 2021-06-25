const {buildSchema} = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql');
//跨域组件
const cors = require('cors')

const {v4: uuidv4} = require('uuid')

const app = express()
app.use(cors())

const articles = [
    {id: '1', title: 'article 1', body: 'article 1 body'},
    {id: '2', title: 'article 2', body: 'article 2 body'},
    {id: '3', title: 'article 3', body: 'article 3 body'},
    {id: '4', title: 'article 4', body: 'article 4 body'}
]

//GraphQL数据类型解释
/*
 * 查询参数
 * 修改
 * 输入类型
 */

//1.使用GraphQL Schema语法构建一个schema
const schema = buildSchema(`
    type Article{
        id: ID,
        title: String!,
        body: String!,
        tagList: [String!]
    }
    
    # 查询入口
    type Query{
        articles: [Article],
        article(id: ID!): Article
    }
    
    # 参数对象必须使用Input定义
    input ArticleInput{
        title: String!, 
        body: String!
    }
    
    
    # 修改入口
    type Mutation {
        createArticle(article: ArticleInput!): Article,
        updateArticle(id: ID!, article: ArticleInput!): Article
        deleteArticle(id: ID!): Boolean
    }
`)

//2.定义schema的resolver
const root = {
    articles() {
        console.log(articles);

        return articles;
    },
    article({id}) {
        console.log(id);

        return articles.find(article => article.id === id);
    },
    createArticle({article}) {
        console.log(article);
        article.id = uuidv4();
        articles.push(article);

        return article;
    },
    updateArticle({id, article}) {
        console.log(id, article);
        const articleOld = articles.find(article => article.id === id);
        articleOld.title = article.title;
        articleOld.body = article.body;

        return articleOld;
    },
    deleteArticle({id}) {
        console.log('id is ', id)
        const index = articles.findIndex(article => article.id === id);
        console.log(index);

        if(index>-1)
            articles.splice(index, 1);

        return true;
    }
}

//3.挂载GraphQL中间件
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true //开启浏览器GraphQL IDE调试工具
}))

//4.启动Web服务
app.listen(4000, () => {
    console.log('GraphQL Server is running at http://localhost:4000')
})
