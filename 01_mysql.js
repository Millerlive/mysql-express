// mysql  关系型数据库
// terminal 启动mysql :   mysql -u root -p   =>password
// mysql command line 启动mysql : password
/* 
    数据库相关概念：
        数据库（database）: 存储数据的仓库
        DBMS（Database Management System） 数据库管理系统 用于操纵管理数据库的大型软件
        SQL （Structured Query Language） 结构化查询语言 ：专门用来与数据库通讯的语言  （通用语法）
            SQL语句 可以单行或多行书写，以分号;结尾，
            SQL语句可以通过使用空格缩进增强语句的可读性
            MySQL 数据库 的SQL语句 不区分大小写 ，关键字建议用大写
            注释： 单行注释 ： -- 注释   或  # （MySQL特有）
 */
//                  多行注释 ： /* 注释*/
/* 

mysql -u root -p 连接MySQL


数据库操作
    show databases; 查看所有数据库
    use databasename ; 使用数据库
    drop database databaseName ; 删除数据库

--表操作
    show tables ; 查看数据库中的所有表
    create table if not exists tableName(
        字段  字段类型   [comment '注释'] ，
        id     int     [comment  'id'],
        name   varchar(20) 
    )[comment  '表注释'];
    
    drop table tableName ; 删除表
    desc user; 查看表结构
    show create table user; 查看建表语句

    alter table oldname rename to newname;  修改表名
    alter table user add job varchar(255) [FIRST];  向表中添加字段
    alter table user add job varchar(255) [AFTER column_2];  向表中添加字段
    alter table user change 旧字段名 新字段名 int ; 修改字段名及字段类型
    alter table user modify 字段名 新字段类型 ;    修改字段类型
    alter table user drop 字段名;    删除字段

    insert into user ( col1,col2,col3 ) values  (val1,val2,val3); 向表中插入数据

*/

/* 
# * 表示 查找user中的所有数据
SELECT * FROM mydata.user;
use mydata;

字段操作
insert into user (id,name,age,salary) values (2,'mary',20,5000);
insert into user (id,name,age) values (3,'Amy',25);
-- 按照顺序进行插入 一一对应  字符串及日期类型应该包含在引号中 插入数据的大小应该在该字段规定的范围内 -- 
insert into user values (4,'mary1',22,5500);
# 添加多条数据使用，隔开
insert into user values (5,'mary2',22,5600),(6,'mary3',22,6000),(7,'mary4',23,6600);
-- 修改数据  where 条件 不加条件表示全部修改  -- 
update user set name='Jack',age=25 where id = 7;
-- 删除数据 -- 
delete from user where id=6;
# 查找  SELECT
SELECT * FROM user;
# 基本查询
# select 字段名列表 from 表名
SELECT id,name,age,salary FROM user;
# 条件查询 where
# select 字段名列表 from 表名 where 条件 ;
# 逻辑运算符   and &&    or ||    not  !
# 比较运算符    >  <  >=  <=  <> !=  
SELECT id,name,age,salary FROM user where id=2;
SELECT id,name,age,salary FROM user where id>2 and salary>5500;

SELECT id,name,age,salary FROM user where salary<6000 and salary>5000 ;
#  between 最小值 and 最大值   （包含最小值和最大值）
SELECT id,name,age,salary FROM user where salary between 5000 and 6600;
# in ()  在in之后的列表中多选一
SELECT id,name,age,salary FROM user where age in (20,21,22,23);
# 模糊匹配 like  % 表示匹配任意个字符  _ 表示匹配单个字符
SELECT id,name,age,salary FROM user where name like 'm%';
SELECT id,name,age,salary FROM user where name like '____';

#  id null  值为null 的数据
SELECT id,name,age,salary FROM user where salary is null;
SELECT id,name,age,salary FROM user where salary is not null;

# as  name  起别名    as可以省略
SELECT id,name,age,salary as s FROM user;
select id,name n,age a,salary s from user;

# distinct 去重  SELECT distinct 字段名  FROM 表名;
SELECT distinct age  FROM user;





use mydata;
SELECT * FROM user;
update user set salary= 5500 where id = 3;
alter table user add job varchar(20) after salary;
# 排序   order by  默认是升序 ASC(可以省略)   降序 DESC
select * from user order by age desc;
-- 分组查询  group by   通常配合 聚合函数使用 --  
# 聚合函数 count(字段列表) 统计数量 max() 最大值  min() 最小值 avg() 平均值 sum () 求和
# null值不参与聚合函数的运算
select count(*) from user where age>25;
select count(salary) as salCount from user;
select max(salary) as top from user;
select min(salary) as bottom from user;
select avg(age) as avgAge from user;
select sum(age) as ageSum from user;

# group by 字段名  根据哪个字段进行分组
select job,count(job) from user group by job;
 # having 分组后的过滤条件
select salary,count(salary) num from user group by salary having salary<5600;
# where 是分组前进行过滤  having是 分组后进行过滤
# where 后不能跟聚合函数  having 后可以跟聚合函数
select salary,count(salary) num from user where age>20 group by salary having salary<5600;
select salary,count(salary) num from user where age<30 group by salary ;
select salary,count(salary) num from user where age<30 group by salary having count(salary)>=2;
select salary,count(salary) num from user where age<30 group by salary order by num desc limit 2 ;
-- 执行顺序 from =》where => group by(having) =》 select =》 order by =>limit -- 

# 正则 regexp
select * from user where name regexp '^mar' ;
select * from user where name regexp 'a' ;

 create table if not exists info(
        id  int primary key  ,
        leader varchar(20)
        
)comment  '表注释';

insert into info(id,leader)  values (1,'aaa'),(2,'bbb'),(3,'ccc'),(4,'aaa'),(5,'bbb'),(6,'ddd');
select * from user ;
select * from info ;
# 内连接
# SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 连接条件...
select * from user u inner join info i on u.id=i.id;
select u.*,i.leader from user u inner join info i on u.id=i.id;
select u.id,u.name,i.leader from user u inner join info i on u.id=i.id;


# 左外连接
# SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件;
#相当于查询表1(左表)的所有数据 包含 表1和表2交集部分的数据
select u.id,u.name,i.leader from user u left outer join info i on u.id=i.id;
select i.id,u.name,i.leader from info i left outer join  user u on u.id=i.id;

-- 右外连接-- 
# SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 条件
#相当于查询表2(右表)的所有数据 包含 表1和表2交集部分的数据
select i.id,u.name,i.leader from user u right outer join info i on u.id=i.id;
select u.id,u.name,i.leader from info i right outer join  user u on u.id=i.id;

-- 分页查询 limit 起始索引，查询记录数  起始索引 不写表示从0开始   -- 
select * from user limit 2 ;
select * from user limit 2,2 ;
# 第 n 页  的 起始索引 为 （页数-1）*每页条数
select * from user limit 4,2 ;










*/