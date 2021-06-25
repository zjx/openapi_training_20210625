const {buildSchema} = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql');

const app = express()

app.all("*", function (req, res, next) {
    // 设置请求头为允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 设置服务器支持的所有头信息字段
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken"
    );
    // 设置服务器支持的所有跨域请求的方法
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    if (req.method.toLowerCase() == "options") {
        res.send(200); // 让options尝试请求快速结束
    } else {
        next();
    }
});

//GraphQL数据类型解释
//对象类型
//数组类型
//不可为空!,默认情况，字段可以为空

//1.使用GraphQL Schema语法构建一个schema
const schema = buildSchema(`
    type Score{
        name: String,
        score: Float
    }
    
    type User{
        name: String,
        age: Int,
        hobbies: [String!]!,
        scores: [Score]
    }
    
    type Article{
        title: String,
        body: String,
        author: User
    }
    
    type Query{
        foo: String!,
        count: Int,
        salary(city: String): Int,
        isGood: Boolean,
        userId: ID,
        user: User,
        article: Article
    }
`)

//2.定义schema的resolver
const root = {
    foo() {
        return 'bar'
    },
    count() {
        return 123;
    },
    salary({city}) {
        if (city === "北京" || city == "上海" || city == "广州" || city == "深圳") {
            return 10000;
        }
        return 3000;
    },
    isGood() {
        return true;
    },
    userId() {
        return 2341;
    },
    user() {
        return {
            name: 'Jack',
            age: 18,
            hobbies: ['吃饭', '睡觉', null],
            scores: [
                {name: '英语', score: 78},
                {name: '数学', score: 98}
            ]
        }
    },
    article() {
        return {
            title: '标题',
            body: '内容',
            author: {
                name: 'Jack',
                age: 18
            }
        }
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
