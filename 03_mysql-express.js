// express mysql
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const emailRoute = require('./04_email')
const PORT = 8080;
// 创建数据集连接的配置
// const connection = mysql.createConnection({
//   host: "localhost", //数据库服务器地址
//   user: "root", //数据库用户名
//   password: "123456", //数据库密码
//   database: "mydata", //要连接的数据库名
// });
const connection = mysql.createConnection({
  host: 'bafqb54mnlizqzdycefi-mysql.services.clever-cloud.com',
  user: "u7hdaz6m7dlnxjlu", //数据库用户名
  password: "ttUAd9ghpHFMpiCJUmtC", //数据库密码
  database: "bafqb54mnlizqzdycefi", //要连接的数据库名
});
connection.connect((err) => {
  if (err) {
    console.log("err:", err);
  } else {
    console.log("mysql success");
  }
});
const app = express();
app.use(cors());
app.use('/email',emailRoute)
app.get("/", (req, res) => {
  res.send("get");
});
// 获取user表的所有数据
app.get("/user", (req, res) => {
  let sql = "SELECT * from user";
  connection.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/age/:age", (req, res) => {
  let num = req.params.age;
  let sql = "SELECT * from user where age > ?";
  connection.query(sql, [num], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(PORT, () => {
  console.log("listening on port :", PORT);
});
