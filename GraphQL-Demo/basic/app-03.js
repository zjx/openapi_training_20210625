const { buildSchema } = require('graphql')
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
/*
 Query 严格来说是一种对象类型
 Query 是所有查询的入口点
 Query 必须有

 标量类型：
 1、Int
 2、Float
 3、String UTF-8字符序列
 4、Boolean
 5、ID
 */
//1.使用GraphQL Schema语法构建一个schema
const schema = buildSchema(`
    type Query{
        foo: String,
        count: Int,
        salary(city: String): Int,
        isGood: Boolean,
        userId: ID
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
    salary(city) {
        if(city === "北京" || city == "上海" || city == "广州" || city == "深圳") {
            return 10000;
        }
        return 3000;
    },
    isGood(){
        return true;
    },
    userId(){
        return 2341;
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
