//  使用node.js 连接mysql
// 安装 mysql2  npm i mysql2
const  mysql = require('mysql2')

// 创建数据集连接的配置
const connection = mysql.createConnection({
    host: 'localhost', //数据库服务器地址
    user: 'root', //数据库用户名
    password:'123456' ,//数据库密码
    database:'mydata'  //要连接的数据库名
})

connection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('success');
    }
})
// connection.query(SQL语句，callback)
// connection.query('SELECT * FROM user',(err,result)=>{
//     if(err){
//         console.log('error');
//     }else{
//         console.log('result',result);
//     }
// })

// 参数化查询 使用问号？ 作为占位符，将实际参数作为第二个参数传入 数组形式
// let user  = "'mary'"
// let user  = 'mary'
// let user  = "'mary'; update user set salary=1000 where id=3;"
// connection.query("SELECT * FROM user where name= ?" ,[user],(err,result)=>{

connection.query("SELECT id,name,age,salary FROM user where age> ? and salary> ?" ,[25,5000],(err,result)=>{
    if(err){
        console.log('error',err);
    }else{
        console.log('result',result);
    }
})