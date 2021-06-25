const express = require('express');
const {buildSchema} = require('graphql');
const grapqlHTTP = require('express-graphql');
const mysql = require('mysql');
// https://www.npmjs.com/package/mysql
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashen'
});


// 定义schema，查询和类型, mutation
const schema = buildSchema(`
    input AccountInput {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Account {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Mutation {
        createAccount(input: AccountInput): Account
        deleteAccount(id: ID!): Boolean
        updateAccount(id: ID!, input: AccountInput): Account
    }
    type Query {
        accounts: [Account]
    }
`);

// 定义查询对应的处理器
const root = {
    accounts() {
        return new Promise((resolve, reject)=>{
            pool.query('select name, age, sex, department from account', (err, results)=> {
                if(err) {
                    console.log('出错了' + err.message);
                    return;
                }
                const arr = [];
                for(let i=0;i<results.length;i++) {
                    arr.push({
                        name: results[i].name,
                        sex: results[i].sex,
                        age: results[i].age,
                        department: results[i].department,
                    })
                }
                resolve(arr);
            })
        })
    },
    createAccount({ input }) {
        const data = {
            name: input.name,
            sex: input.sex,
            age: input.age,
            department: input.department
        }
        return new Promise((resolve, reject)=>{
            pool.query('insert into account set ?', data, (err) => {
                if (err) {
                    console.log('出错了' + err.message);
                    return;
                }
                // 返回保存结果
                resolve(data);
            })
        })
    },

    updateAccount({ id, input }) {
        const data = input
        return new Promise((resolve, reject) => {
            pool.query('update account set ? where name = ?', [data, id], (err) => {
                if (err) {
                    console.log('出错了' + err.message);
                    return;
                }
                // 返回保存结果
                resolve(data);
            })
        })
    },
    deleteAccount({id}) {
        return new Promise((resolve, reject)=>{
            pool.query('delete from account where name = ?', [id], (err)=>{
                if(err) {
                    console.log('出错了' + err.message);
                    reject(false);
                    return;
                }
                resolve(true);
            })
        })
    }
}

const app = express();

app.use('/graphql', grapqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(3000);