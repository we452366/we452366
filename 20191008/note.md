## MongoDB

### mongodb-1

#### 什么是MongoDB
- MongoDB是一个基于分布式文件存储的开源数据库系统
- MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

#### MongoDB安装

##### windows安装
Windows官方安装指南
- mongodb32位安装版 链接: https://pan.baidu.com/s/1SHJ1vre_CQOE3u-W0zniqQ 密码: chan
- MongoDB64位绿色版 链接: https://pan.baidu.com/s/1EkAB2SrcU1mfMfff_WDxtA 密码: w913
- mongo客户端 链接: https://pan.baidu.com/s/1YFxLZ-55D-WFR8os2fXN0A 密码: 61qd

##### mac安装

Mac官方安装指南

1. 先安装homebrew
http://brew.sh/

2. 使用brew安装mongodb
brew install mongodb

3. 再安装可视化工具 Robomongo

#### mongodb启动与连接

##### windows启动服务器端
1. 找到mongodb安装目录,一般是 C:\Program Files\MongoDB 2.6 Standard\bin
2. 按下Shift+鼠标右键,选择在此处打开命令窗口
3. 在除C盘外的盘符新建一个空目录,如 D:\Mongodb\data
4. 在命令行中输入mongod --dbpath=刚创建的空目录,如
mongod --dbpath=D:\Mongodb\data
5. 再按回车键

- 如果出现waiting for connections on port 27017就表示启动成功,已经在27017端口上监听了客户端的请求
- 注意：--dbpath后的值表示数据库文件的存储路径,而且后面的路径必须事先创建好，必须已经存在，否则服务开启失败
- 注意：这个命令窗体绝对不能关,关闭这个窗口就相当于停止了mongodb服务

#### MongoDB基本概念
- 数据库 MongoDB的单个实例可以容纳多个独立的数据库，比如一个学生管理系统就可以对应一个数据库实例
- 集合 数据库是由集合组成的,一个集合用来表示一个实体,如学生集合
- 文档 集合是由文档组成的，一个文档表示一条记录,比如一位同学张三就是一个文档

|mongodb|mysql|
|:-|:-|
|文档(document) 单个文档最大16M|记录(row)|
|集合(collection)|表(table)|
|数据库(database) 32位系统上，一个数据库的文件大小不能超过2G|数据库(database)|

#### 数据库操作

##### 使用数据库

1. 语法
use database_name     

- database_name 代表数据库的名字
- 注：如果此数据库存在，则切换到此数据库下,如果此数据库还不存在也可以切过来,但是并不能立刻创建数据库

2. 切换到 school数据库下
use school

##### 查看所有数据库

语法
show dbs

备注: 我们刚创建的数据库school如果不在列表内， 要显示它，我们需要向school数据库插入一些数据
db.students.insert({name:'zfpx',age:1});

##### 查看当前使用的数据库

语法
db

注：db代表的是当前数据库 也就是school这个数据库

##### 删除数据库

语法
db.dropDatabase()

#### 集合操作

##### 查看集合帮助

语法
db.students.help();

##### 查看数据库下的集合
show collections

##### 创建集合

1. 创建一个空集合
db.createCollection(collection_Name)      
collection_Name集合的名称

2. 创建集合并插入一个文档
collection_Name集合的名称
document要插入的文档
db.collection_Name.insert(document)

#### 插入文档

##### insert
db.collection_name.insert(document);

collection_name 集合的名字
document 插入的文档
每当插入一条新文档的时候mongodb会自动为此文档生成一个_id属性,_id一定是唯一的，用来唯一标识一个文档 _id也可以直接指定，但如果数据库中此集合下已经有此_id的话插入会失败
db.students.insert({_id:1,name:'zfpx',age:1});
WriteResult({ "nInserted" : 1 })
db.students.insert({_id:1,name:'zfpx',age:1});

##### save
db.collection_name.save(document)
collection_name 集合的名字
document 插入的文档

注：如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。

db.students.save({_id:1,name:'zfpx',age:1});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 0 })

db.students.save({_id:1,name:'zfpx',age:100});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

#### 更新文档

##### 语法
db.collection.update(
   <query>,
   <updateObj>,
   {
     upsert: <boolean>,
     multi: <boolean>
   }
)

##### 参数
- query 查询条件,指定要更新符合哪些条件的文档
- update 更新后的对象或指定一些更新的操作符
    - $set直接指定更新后的值
    - $inc在原基础上累加
- upsert 可选，这个参数的意思是，如果不存在符合条件的记录时是否插入updateObj. 默认是false,不插入。
- multi 可选，mongodb 默认只更新找到的第一条记录，如果这个参数为true,就更新所有符合条件的记录。

##### upsert
将students集合中数据中name是zfpx2的值修改为zfpx22

db.students.insert({_id:1,name:'zfpx1'});
WriteResult({ "nInserted" : 1 })

db.students.update({_id:2},{name:'zfpx2'},{upsert:true});
WriteResult({ "nMatched" : 0, "nUpserted" : 1, "nModified" : 0, "_id" : 2 })

##### multi
如果有多条name是zfpx2的数据只更新一条,如果想全部更新需要指定{multi:true}的参数

db.students.update({name:'zfpx2'},{$set:{age:10}},{multi:true});
WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 2 });

#### 更新操作符

##### $set
直接指定更新后的值
db.c3.update({name:'zfpx2'},{$set:{age:10}},{multi:true});

##### $inc
在原基础上累加
db.c3.update({name:'zfpx2'},{$inc:{age:1}},{multi:true});

##### $unset
删除指定的键
db.c3.update({name:'zfpx2'},{$unset:{age:1}},{multi:true});

##### $push
向数组中添加元素
var result = db.student.update({name:'张三'},{
    $push:{"hobbys":"smoking"}
});

##### $ne
$ne类似于MYSQL的 not in 或者not exists
db.student.update({name:'zfpx1',hobbys:{$ne:'smoking'}},{$push:{"hobbys":"smoking"}});

##### $addToSet
向集合中添加元素
db.student.update({name:'zfpx1'},{$addToSet:{"hobbys":"smoking"}});

##### $each
把数组中的元素逐个添加到集合中
var hobbys = ["A",'B'];
db.student.update({name:'zfpx1'},{$addToSet:{hobbys:{$each:hobbys}}});

##### $pop
从数组中移除指定的索引中对应的元素
db.student.update({name:'zfpx1'},{$pop:{hobbys:1}});

##### 修改指定索引元素
db.c3.update({name:'zfpx1'},{$set:{"hobbys.0":"smoking2"}});

#### 文档的删除
remove方法是用来移除集合中的数据

##### 语法
db.collection.remove(
   <query>,
   {
     justOne: <boolean>
   }
)

##### 参数
query :（可选）删除的文档的条件。
justOne : （可选）如果设为 true 或 1，则只删除匹配到的多个文档中的第一个

##### 实例
删除worker集合里name是zfpx2的所有文档数据
db.students.remove({name:'zfpx2'});
WriteResult({ "nRemoved" : 2 })

即使匹配多条也只删除一条
db.students.remove({name:"zfpx2"},{justOne:true})
WriteResult({ "nRemoved" : 1 })

#### 查询文档

##### find
语法
db.collection_name.find()

参数
collection_name 集合的名字

实例 查询students下所有的文档
db.students.find()

##### 查询指定列
语法
db.collection_name.find({queryWhere},{key:1,key:1})

参数列表
- collection_name 集合的名字
- queryWhere 参阅查询条件操作符
- key 指定要返回的列
- 1 表示要显示

实例 只返回显示age列
db.students.find({},{age:1});

##### findOne
查询匹配结果的第一条数据 语法
db.collection_name.findOne()

实例
db.students.findOne()

##### $in
查询字段在某个范围内
db.student.find({age:{$in:[30,100]}},{name:1,age:1});

##### $nin
查询字段不在某个范围内
db.student.find({age:{$nin:[30,100]}},{name:1,age:1});

##### $not
对特定条件取反
db.student.find({age:{$not:{$gte:20,$lte:30}}});

##### array
对数组的查询
//按所有元素匹配
//let result = db.student.find({friends:[ "A", "B", "C", "D" ]});
//匹配一项 包含A的就可以
//let result = db.student.find({friends:"A"});
//$all 必须同时包含A B
//let result = db.student.find({friends:{$all:['A',"B"]}});
//$in 或者关系 ，包含A或者B
//let result = db.student.find({friends:{$in:['A',"B"]}});
//$size 按数组的长度去匹配
//let result = db.student.find({friends:{$size:4}});
//$slice 只返回数组中的某一部分
//let result = db.student.find({friends:{$size:5}},{name:1,friends:{$slice:2}});
//let result = db.student.find({friends:{$size:5}},{name:1,friends:{$slice:-2}});
$slice:["$array", [startIndex, ] length ] （startIndex可以省略，默认从0开始）
"friends" : [ "A", "B" ] }   "friends" : [ "C", "D" ]
db.stu.find({},{friends:{$slice:[0,3]}});  "friends" : [ "A", "B", "C" ]

##### where
db.student.find({$where:"this.age>30"},{name:1,age:1});

##### cursor
游标不是查询结果，而是查询的一个返回资源或者接口，通过这个接口，可以逐条读取数据
var result = db.student.find();
//while(result.hasNext()){
//    printjson(result.next());
//}

#### 条件操作符
条件操作符用于比较两个表达式并从mongoDB集合中获取数据

##### 大于操作符
语法
db.collectoin_name.find({<key>:{$gt:<value>}})

参数
- collectoin_name 集合名称
- key 字段
- value 值

查询 age 大于 30的数据
db.students.find({age:{$gt:30}})

##### 大于等于操作符
语法
db.collectoin_name.find({<key>:{$gte:<value>}})

参数
- collectoin_name 集合名称
- key 字段
- value 值

查询age 3大于等于30 的数据
db.students.find({age: {$gte: 30}}) 

##### 小于操作符
语法
db.collectoin_name.find( {<key>:{$lt:<value>}})

参数
- collectoin_name集合名称
- key 字段
- value 值

实例
db.students.find({age: {$lt: 30}}) 查询age 小于30的数据

##### 小于等于操作符
语法
db.collectoin_name.find({<key>:{$lte:<value>}})

参数
- collectoin_name集合名词
- key字段
- value值

查询age 小于等于30的数据
db.students.find({age: {$lte: 30}}) 

##### 同时使用 $gte和$lte
语法
db.collectoin_name.find({<key>:{$gte:<value>},<key>:{$lte:<value>}})

参数
- collectoin_name 集合名称
- key 字段
- value 值

实例 查询age 大于等于 30 并且 age 小于等于 50 的数据
db.students.find({age: {$gte: 30, $lte: 50}})

##### 等于
语法
db.collectoin_name.find({<key>:<value>,<key>:<value>})

参数
- collectoin_name集合名词
- key字段
- value值

查询age = 30的数据
db.students.find({"age": 30})`

##### 使用 _id进行查询
语法
db.collectoin_name.find({"_id" : ObjectId("value")})

参数
- value _id的值

实例 查询_id是 562af23062d5a57609133974 数据
db.students.find({_id:ObjectId("5adb666ecd738e9771638985")});
{ "_id" : ObjectId("5adb666ecd738e9771638985"), "name" : "zzzz" }

##### 查询结果集的条数
语法
db.collectoin_name.find().count()

参数
collectoin_name 集合名称

实例
db.students.find().count()

##### 正则匹配
语法
db.collection.find({key:/value/})

参数
- collectoin_name 集合名称
- key 字段
- value 值

实例 查询name里包含zhang的数据
db.students.find({name:/value/})

查询某个字段的值当中是否以另一个值开头
db.students.find({name:/^zhang/})

#### 与和或

##### and
find方法可以传入多个键(key)，每个键(key)以逗号隔开

语法
db.collection_name.find({key1:value1, key2:value2})

实例 查询name是zfpx并且age是1的数据
db.students.find({name:'zfpx',age:1})

##### or
语法
db.collection_name.find(
   {
      $or: [
   {key1: value1}, {key2:value2}
      ]
   }
)

实例 查询age = 30 或者 age = 50 的数据
db.students.find({$or:[{age:30},{age:50}]})

##### and和or联用
语法
db.collection_name.find(
   {
     key1:value1,
     key2:value2,
     $or: [
   {key1: value1},
   {key2:value2}
     ]
   }
)

实例 查询 name是zfpx 并且 age是30 或者 age是 50 的数据
db.students.find({name:'zfpx',$or:[{age:30},{age:50}]})

#### 分页查询

##### limit
读取指定数量的数据记录 语法
db.collectoin_name.find().limit(number)

参数
- collectoin_name集合
- number读取的条数

实例 查询前3条数据
db.students.find().limit(3)

##### skip
跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数 语法
db.collectoin_name.find().skip(number)

参数
- collectoin_name集合
- number跳过的条数

实例 查询3条以后的数据
db.students.find().skip(3)

##### skip+limit
通常用这种方式来实现分页功能 语法
db.collectoin_name.find().skip(skipNum).limit(limitNum)

参数
- collectoin_name 集合名称
- skipNum 跳过的条数
- limitNum 限制返回的条数

实例 查询在4-6之间的数据
db.students.find().skip(3).limit(3);

##### sort排序
sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。 语法
db.collectoin_name.find().sort({key:1})
db.collectoin_name.find().sort({key:-1})

参数
- collectoin_name集合
- key表示字段

实例 查询出并升序排序 {age:1} age表示按那个字段排序 1表示升序
db.students.find().sort({age:1})

#### 执行脚本
var username = 'zfpx';
var password = '123456';
var user = { "username": username, "password": password };
var db = connect('students');//选择users数据库
var result = db.users.insert(user);
print('write ' + result);
var start = Date.now();
var db = connect('students');
for (var i = 0; i < 1000; i++) {
    db.users.insert({ "username": "zfpx" + i });
}
var cost = Date.now() - start;
print('cost ' + cost + ' ms');
var start = Date.now();
var db = connect('students');
var users = [];
for (var i = 0; i < 1000; i++) {
    users.push({ "username": "zfpx" + i });
}
db.users.insert(users);
var cost = Date.now() - start;
print('cost ' + cost + ' ms');

在命令行中执行

script>mongo 1.js
MongoDB shell version: 2.6.7
connecting to: test
connecting to: students
write WriteResult({ "nInserted" : 1 })

#### 备份与导出
mongodump
    -- host 127.0.0.1
    -- port 27017
    -- out D:/databack/backup
    -- collection mycollection
    -- db test
    -- username
    -- password
//mongodump --host 127.0.0.1 --port 27017 --out ./backup --collection users --db students
//db.users.drop();

mongorestore
--host
--port
--username
--password

// mongorestore --host 127.0.0.1 --port 27017 ./backup

#### 权限

##### 创建用户
- 使用use admin进入我们的admin库
- 使用db.createUser方法来创建集合

db.createUser({
    user:'zfpx',
    pwd:'123456',
    customData:{
        name:'zhufengpeixun',
        email:'zhufengpeixun@126.com',
        age:9
    },
    roles:[
        {
          role:'readWrite',
          db:'school'
        },
        'read'
    ]
});

##### 查询用户
db.system.users.find();

##### 删除用户
db.system.users.remove({user:'zfpx'});

##### 启动数据库权限检查
mongod --auth
mongo  -u zfpx -p 123456 127.0.0.1:27017/admin

##### 鉴权
use admin;
db.auth('zfpx','zfpx');
正确返回1，如果错误返回0

#### 索引

##### 准备数据
var db = connect('school');//选择users数据库
var users = [];
for(var i=0;i<20;i++){
    users.push({_id:i,name:'zfpx'+i});
}
print(users.length);
db.users.insert(users);

##### 打印出查询时间
var startTime = Date.now();
var  db = connect('school');          
var  records=db.users.find({name:"zfpx100"});
records.forEach(function(item){printjson(item)});
print(Date.now() - startTime);

##### 建立索引
db.users.ensureIndex({name:1});

#### 附录

##### ObjectId构成
之前我们使用MySQL等关系型数据库时，主键都是设置成自增的。但在分布式环境下，这种方法就不可行了，会产生冲突。为此，MongoDB采用了一个称之为ObjectId的类型来做主键。ObjectId是一个12字节的 BSON 类型字符串。按照字节顺序，一次代表：
- 4字节：UNIX时间戳
- 3字节：表示运行MongoDB的机器
- 2字节：表示生成此_id的进程
- 3字节：由一个随机数开始的计数器生成的值

##### Mongodb启动命令mongod参数说明

|选项|含义|
|:-|:-|
|--port|指定服务端口号，默认端口27017|
|--logpath|指定MongoDB日志文件，注意是指定文件不是目录|
|--logappend|使用追加的方式写日志|
|--dbpath|指定数据库路径|
|--directoryperdb|设置每个数据库将被保存在一个单独的目录|

##### 集合命令
- db.students.help();
- DBCollection help
- db.students.find().help() - show DBCursor help 显示游标帮助
- db.students.count() 显示条数
- db.students.copyTo(newColl) - duplicates collection by copying all docum ents to newColl; no indexes are copied. 把一个旧集合拷贝到一个新的集合，不拷贝索引
- db.students.convertToCapped(maxBytes) - calls {convertToCapped:'students ', size:maxBytes}} command
- db.students.dataSize() 数据大小
- db.students.distinct( key ) - e.g. db.students.distinct( 'x' ) 统计唯一的key的数量
- db.students.drop() drop the collection ，删除集合
- db.students.dropIndex(index) - e.g. db.students.dropIndex( "indexName" ) 删除索引 or db.students.dropIndex( { "indexKey" : 1 } )
- db.students.dropIndexes() 删除 所有的索引
- db.students.ensureIndex(keypattern[,options]) - options is an object wit h these possible fields: name, unique, dropDups 添加索引
- db.students.reIndex()
- db.students.find([query],[fields]) - query is an optional query filter. fields is optional set of fields to return. 查找文档
     e.g. db.students.find( {x:
77} , {name:1, x:1} )
- db.students.find(...).count() 数量
- db.students.find(...).limit(n) 限制返回的条数
- db.students.find(...).skip(n) 设置跳过的条数
- db.students.find(...).sort(...) 排序
- db.students.findOne([query]) 查找一条
- db.students.findAndModify( { update : ... , remove : bool [, query: {}, sort: {}, 'new': false] } ) 查找并且修改 更新后的值，是否删除，查询条件 排序 是否返回新值
- db.students.getDB() get DB object associated with collection 获得DB
- db.students.getPlanCache() get query plan cache associated with collecti on
- db.students.getIndexes() 获取索引
- db.students.group( { key : ..., initial: ..., reduce : ...[, cond: ...] } ) 分组统计
- db.students.insert(obj) 插入文档
- db.students.mapReduce( mapFunction , reduceFunction , ) 统计
- db.students.aggregate( [pipeline], ) - performs an agg regation on a collection; returns a cursor 聚合
- db.students.remove(query) 删除
- db.students.renameCollection( newName , ) renames the colle ction. 重命名集合
- db.students.runCommand( name , ) runs a db command with the gi ven name where the first param is the collection name
- db.students.save(obj) 保存对象
- db.students.stats() 统计信息
- db.students.storageSize() - includes free space allocated to this collec tion
- db.students.totalIndexSize() - size in bytes of all the indexes
- db.students.totalSize() - storage allocated for all data and indexes
- db.students.update(query, object[, upsert_bool, multi_bool]) - instead o f two flags, you can pass an object with fields: upsert, multi 更新
- db.students.validate( ) - SLOW
- db.students.getShardVersion() - only for use with sharding
- db.students.getShardDistribution() - prints statistics about data distri bution in the cluster
- db.students.getSplitKeysForChunks( ) - calculates split p oints over all chunks and returns splitter function
- db.students.getWriteConcern() - returns the write concern used for any o perations on this collection, inherited from server/db if set
- db.students.setWriteConcern( ) - sets the write conc ern for writes to the collection
- db.students.unsetWriteConcern( ) - unsets the write concern for writes to the collection

#### 角色

##### 数据库用户角色
针对每一个数据库进行控制。
- read :提供了读取所有非系统集合，以及系统集合中的system.indexes, system.js, system.namespaces
- readWrite: 包含了所有read权限，以及修改所有非系统集合的和系统集合中的system.js的权限

##### 数据库管理角色
每一个数据库包含了下面的数据库管理角色。
- dbOwner：该数据库的所有者，具有该数据库的全部权限。
- dbAdmin：一些数据库对象的管理操作，但是没有数据库的读写权限。（参考：http://docs.mongodb.org/manual/reference/built-in-roles/#dbAdmin）
- userAdmin：为当前用户创建、修改用户和角色。拥有userAdmin权限的用户可以将该数据库的任意权限赋予任意的用户。

##### 集群管理权限
- admin数据库包含了下面的角色，用户管理整个系统，而非单个数据库。这些权限包含了复制集和共享集群的管理函数。
- clusterAdmin：提供了最大的集群管理功能。相当于clusterManager, clusterMonitor, and hostManager和dropDatabase的权限组合。
- clusterManager：提供了集群和复制集管理和监控操作。拥有该权限的用户可以操作config和local数据库（即分片和复制功能）
- clusterMonitor：仅仅监控集群和复制集。
- hostManager：提供了监控和管理服务器的权限，包括shutdown节点，logrotate, repairDatabase等。 备份恢复权限：admin数据库中包含了备份恢复数据的角色。包括backup、restore等等。

##### 所有数据库角色
- admin数据库提供了一个mongod实例中所有数据库的权限角色：
- readAnyDatabase：具有read每一个数据库权限。但是不包括应用到集群中的数据库。
- readWriteAnyDatabase：具有readWrite每一个数据库权限。但是不包括应用到集群中的数据库。
- userAdminAnyDatabase：具有userAdmin每一个数据库权限，但是不包括应用到集群中的数据库。
- dbAdminAnyDatabase：提供了dbAdmin每一个数据库权限，但是不包括应用到集群中的数据库。

##### 超级管理员权限
root: dbadmin到admin数据库、useradmin到admin数据库以及UserAdminAnyDatabase。但它不具有备份恢复、直接操作system.*集合的权限，但是拥有root权限的超级用户可以自己给自己赋予这些权限。

##### 备份恢复角色
backup、restore；

##### 内部角色
__system

### mongodb-2

#### 通过配置项启动数据库
|参数|含义|
|:-|:-|
|--dbpath|指定数据库文件的目录|
|--port|端口 默认是27017 28017|
|--fork|以后台守护的方式进行启动|
|--logpath|指定日志文件输出路径|
|--config|指定一个配置文件|
|--auth|以安全方式启动数据库，默认不验证|

##### mongo.conf
dbpath=E:\mongo\data
logpath=E:\mongo\log
port=50000

##### 启动服务器
mongod --config mongo.conf

##### 启动客户端
mongo --port 50000

#### 导入导出数据
这命令是保存成了文件格式
- mongoimport 导出数据
- mongoexport 导入数据

|参数|含义|
|:-|:-|
|-h [ --host ]|连接的数据库|
|--port|端口号|
|-u|用户名|
|-p|密码|
|-d|导出的数据库|
|-d|导出的数据库|
|-c|指定导出的集合|
|-o|导出的文件存储路径|
|-q|进行过滤|

##### 准备数据
use school;
var students = [];
for(var i=1;i<=10;i++){
    students.push({name:'zfpx'+i,age:i});
}
db.students.insert(students);
db.students.find();

##### 备份记录
mongoexport -h 127.0.0.1 --port 50000  -d school -c students -o stu.bak

##### 删除记录
db.students.remove({});
WriteResult({ "nRemoved" : 10 })

##### 导入记录
mongoimport --port 50000 --db school --collection students --file
stu.bak

#### 备份与恢复

##### mongodump
在Mongodb中我们使用mongodump命令来备份MongoDB数据。该命令可以导出所有数据到指定目录中。

mongodump -h dbhost -d dbname -o dbdirectory
-h MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
-d 需要备份的数据库实例，例如：test
-o 备份的数据存放位置
mongodump  -d school -o data.dmp

##### mongorestore
mongodb使用 mongorestore 命令来恢复备份的数据。
--host MongoDB所在服务器地址
--db -d 需要恢复的数据库实例
最后的一个参数，设置备份数据所在位置
mongorestore  data.dmp
mongorestore -d school data.bmp/school
Mongodump可以backup整个数据库，而mongoexport要对每个collection进行操作，最主要的区别也是选择的标准是mongoexport输出的JSON比Mongodump的BSON可读性更高，进而可以直接对JSON文件进行操作然后还原数据（BSON转换JSON存在潜在兼容问题）。

#### 锁定和解锁数据库
为了数据的完整性和一致性，导出前要先锁定写入，导出后再解锁。

use admin;
switched to db admin
db.runCommand({fsync:1,lock:1});
{
        "info" : "now locked against writes, use db.fsyncUnlock() to unlock",
        "seeAlso" : "http://dochub.mongodb.org/core/fsynccommand",
        "ok" : 1
}
db.fsyncUnlock();
{ "ok" : 1, "info" : "unlock completed" }

#### 安全措施
- 物理隔离
- 网络隔离
- 防火墙(IP/IP段/白名单/黑名单)
- 用户名和密码验证

##### 用户管理
1. 查看角色
show roles;

内置角色
- 数据库用户角色：read、readWrite；
- 数据库管理角色：dbAdmin、dbOwner、userAdmin;
- 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManage；
- 备份恢复角色：backup、restore；
- 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
- 超级用户角色：root
- 内部角色：__system

2. 老的创建用户的方法
db.addUser('zfpx','123456');
WARNING: The 'addUser' shell helper is DEPRECATED. Please use 'createUser' inste
ad
Successfully added user: { "user" : "zfpx", "roles" : [ "root" ] }
show roles;

3. 新的创建用户的方法
db.createUser({
    user:"zfpx2",
    pwd:"123456",
    roles:[
        {
            role:"readWrite",
            db:"school"
        },
        'read'
   ]
})

db.createUser({user:'zfpx2',pwd:'123456',roles:[{role:'read',db:'school'}]});
Successfully added user: {
        "user" : "zfpx2",
        "roles" : [
                {
                        "role" : "read",
                        "db" : "school"
                }
        ]
}

4. 查看用户的权限
db.runCommand({usersInfo:'zfpx2',showPrivileges:true});
{
        "users" : [
                {
                        "_id" : "admin.zfpx2",
                        "user" : "zfpx2",
                        "db" : "admin",
                        "roles" : [
                                {
                                        "role" : "read",
                                        "db" : "school"
                                }
                ]
}

5. 服务器启动权限认证
dbpath=E:\mongo\data
logpath=E:\mongo\log
port=50000
auth=true

6. 用户登录和修改密码
use admin;
use admin;
switched to db admin
db.auth('zfpx','123456')
1
db.changeUserPassword('zfpx','123');
db.auth('zfpx','123')
1

7. 修改个人信息
db.runCommand({updateUser:'zfpx',pwd:'123', customData:{
        name:'珠峰培训',
        email:'zfpx@126.com',
        age:18,
}});
db.runCommand({usersInfo:'zfpx',showPrivileges:true})

- 用户的操作都需要在admin数据库下面进行操作
- 如果在某个数据库下面执行操作，那么只对当前数据库生效
- addUser已经废弃，默认会创建root用户，不安全，不再建议使用

#### 数据库高级命令

##### 准备数据
var students = [
        {name:'zfpx1',home:'北京',age:1},
        {name:'zfpx2',home:'北京',age:2},
        {name:'zfpx3',home:'北京',age:3},
        {name:'zfpx4',home:'广东',age:1},
        {name:'zfpx5',home:'广东',age:2},
        {name:'zfpx6',home:'广东',age:3}
]
db.students.insert(students);

##### count
查看记录数
db.students.find().count();

##### 查找不重复的值 distinct
db.runCommand({distinct:'students',key:'home'}).values;
[ "北京", "广东" ]

##### group 分组
db.runCommand({
        group:{
                ns:集合名称，
                key:分组的键,
                initial:初始值,
                $reduce:分解器
                condition:条件,
                finalize:完成时的处理器
        }
});

1. 按城市分组，求每个城市里符合条件的人的年龄总和
db.runCommand({
        group:{
                ns:'students',
                key:{home:true},
                initial:{total:0},
                $reduce:function(doc,result){
                      result.total += doc.age;   
                },
                condition:{age:{$gt:1}},
                finalize:function(result){
                    result.desc = '本城市的总年龄为'+result.total;
                }
        }
});

##### 删除集合
db.runCommand({drop:'students'});

##### runCommand常用命令
db.runCommand({buildInfo:1});
db.runCommand({getLastError:"students"});
db.persons.insert({_id:1,name:1});
db.persons.insert({_id:1,name:1});
db.runCommand({getLastError:"students"});

#### 什么固定集合
MongoDB 固定集合（Capped Collections）是性能出色且有着固定大小的集合，对于大小固定，我们可以想象其就像一个环形队列，当集合空间用完后，再插入的元素就会覆盖最初始的头部的元素！ firstinfirstout

##### 特性
- 没有索引
- 插入和查询速度速度非常快 不需要重新分配空间
- 特别适合存储日志

##### 创建固定集合
- 我们通过createCollection来创建一个固定集合，且capped选项设置为true：
- 还可以指定文档个数,加上max:1000属性：
- 判断集合是否为固定集合: db.logs.isCapped()
- size 是整个集合空间大小，单位为【KB】
- max 是集合文档个数上线，单位是【个】
- 如果空间大小到达上限，则插入下一个文档时，会覆盖第一个文档；如果文档个数到达上限，同样插入下一个文档时，会覆盖第一个文档。两个参数上限判断取的是【与】的逻辑。
- capped 封顶的

db.createCollection('logs',{size:50,max:5,capped:true});

##### 非固定集合转为固定集合
db.runCommand({convertToCapped:"logs",size:5});

#### gridfs
- gridfs是mongodb自带的文件系统，使用二进制存储文件。
- mongodb可以以BSON格式保存二进制对象。
- 但是BSON对象的体积不能超过4M。所以mongodb提供了mongofiles。它可以把一个大文件透明地分割成小文件（256K），从而保存大体积的数据。
- GridFS 用于存储和恢复那些超过16M（BSON文件限制）的文件(如：图片、音频、视频等)。
- GridFS 用两个集合来存储一个文件：fs.files与fs.chunks。
- 每个文件的实际内容被存在chunks(二进制数据)中,和文件有关的meta数据(filename,content_type,还有用户自定义的属性)将会被存在files集合中。

##### 上传一个文件
-d 数据库的名称
-l 源文件的位置
put 指定文件名
mongofiles -d myfiles put test.txt

##### 获取并下载文件
mongofiles -d myfiles  get 'test.txt'

##### 查看所有文件
mongofiles -d myfiles  list
db.fs.files.find()
db.fs.chunks.find({files_id:ObjectId('')})

##### 删除文件
mongofiles -d myfiles delete "test.txt"

##### eval 服务器端脚本
- 执行JS语句
- 定义JS全局变量
- 定义函数
- Stored JavaScript

db.eval("1+1");
db.eval("return 'hello'");
db.system.js.insert({_id:"x",value:1});
db.eval("return x");
db.system.js.insert({_id:"say",value:function(){return 'hello'}});
db.eval("say()");

### mongodb-3

#### 索引

#### 建立索引
索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。
这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。
索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构
mongoindex

特殊的数据结构，按顺序保存文档中的一个或多个字段
使用索引，方便范围查询和匹配查询。

#### 二维索引
2.1 插入数据

var students = [];
for(var i=1;i<=300000;i++){
   students.push({name:'zfpx'+i,age:i,random:i});
}
 db.students.insert(students);
db.students.find({age:299999}).explain(true);// "executionTimeMillis" : 245,
2.1.2 创建匿名索引

db.students.ensureIndex({age:1});
db.students.find({age:299999}).explain(true);// "executionTimeMillis" : 7,
2.1.3 创建命名索引

db.students.ensureIndex({name:1},{name:'namedIndex'});
db.students.getIndexes()//查看索引
2.1.4 分析索引的执行过程

MongoDB 提供了一个 explain 命令让我们获知系统如何处理查询请求。利用 explain 命令，我们可以很好地观察系统如何使用索引来加快检索，同时可以针对性优化索引。

cursor: 返回游标类型
BasicCursor而没有使用索引的查询并不是胡乱查询，而是使用了基本游标：，同理，
使用索引的查询就是BtreeCursor
nscanned: 查找过的索引条目的数量
n: 返回的文档数量
nscannedObjects ：数据库按照索引去磁盘上查找实际文档的次数
millis: 执行本次查询所花费的时间，以毫秒计算，这也是判断查询效率的一个重点
indexBounds: 描述索引的使用情况
isMultiKey:是否使用了多键索引
scanAndOrder: 是否在内存中对结果进行了排序
indexOnly:是否仅仅使用索引完成了本次查询
db.students.find({name:'zfpx150000'}).explain();
2.1.5 指定使用的索引

db.students.find({name:'zfpx299999',age:299999}).hint({name:1}).explain(true);
2.1.6 创建唯一索引并删除重复记录

db.person.ensureIndex({ "name" : -1 },{ "name" : "indexname", "unique" : true,dropDups:true })
2.1.7 删除索引

db.students.dropIndex('namedIndex');//删除指定的索引
db.students.dropIndex('*');
db.runCommand({dropIndexes:"students",index:"namedIndex"});//删除所有的索引
2.1.8 在后台创建索引

db.students.ensureIndex({name:1},{name:'nameIndex',unique:true,background:true});
2.1.9 建立多键索引

mongodb可以自动对数组进行索引

db.students.insert({hobby:['basketball','football','pingpang']});
db.students.ensureIndex({hobby:1});
db.students.find({hobby:'football'},{hobby:1,_id:0}).explain(true);
2.1.10 复合索引

查询的条件不止一个，需要用复合索引

db.students.ensureIndex({name:1,age:1});
db.students.find({name:1,age:2},{name:1,age:1,_id:0}).explain(true);
2.1.11 过期索引

在一定的时间后会过期，过期后相应数据数据被删除,比如 session、日志、缓存和临时文件

db.stus.insert({time:new Date()});
db.stus.ensureIndex({time:1},{expireAfterSeconds:10});
db.stus.find();
1.索引字段的值必须Date对象，不能是其它类型比如时间戳
2.删除时间不精确，每60秒跑一次。删除也要时间，所以有误差。
2.1.12 全文索引

大篇幅的文章中搜索关键词,MongoDB为我们提供了全文索引

db.article.insert({content:'I am a gir'});
db.article.insert({content:'I am a boy'});
$text:表示要在全文索引中查东西
$search:后边跟查找的内容, 默认全部匹配
db.article.find({$text:{$search:'boy'}});
db.article.find({$text:{$search:'girl'}});
db.article.find({$text:{$search:'boy girl'}});//多次查找，多个关键字为或的关系
db.article.find({$text:{$search:"a b"}}); 
db.article.find({$text:{$search:"boy -girl"}}); // -表示取消
db.article.find({$text:{$search:"a \"coco cola\" b "}}); //支持转义符的,用\斜杠来转义
2.2 二维索引

mongodb提供强大的空间索引可以查询出一定落地的地理坐标

[{ gis : { x : 50 , y : 30 } ];

2.2.1 创建2D索引

db.maps.ensureIndex({gis:'2d'},{min:1,max:3});
默认会创建一个2D索引
2.2.2 查询出距离点()最近的3个点

db.maps.find({gis:{$near:[1,1]}}).limit(3);
2.2.3 查询以点(50,50)和点(190,190)为对角线的正方形中的所有的点

db.map.find({gis:{$within:{$box:[[1,1],[2,2]]}}},{_id:0,gis:1});
2.2.4 查出以圆心为为半径为规则下圆心面积中的点

db.maps.find({gis:{$within:{$center:[[2,2],1]}}},{_id:0,gis:1});
2.2.5 索引使用的注意事项

1为正序 -1为倒序
索引虽然可以提升查询性能，但会降低插件性能，对于插入多查询少不要创索引
数据量不大时不需要使用索引。性能的提升并不明显，反而大大增加了内存和硬盘的消耗。
查询数据超过表数据量30%时，不要使用索引字段查询
排序工作的时候可以建立索引以提高排序速度
数字索引，要比字符串索引快的多

#### 附录
queryPlanner分析

queryPlanner: queryPlanner的返回
queryPlanner.namespace:该值返回的是该query所查询的表
queryPlanner.indexFilterSet:针对该query是否有indexfilter
queryPlanner.winningPlan:查询优化器针对该query所返回的最优执行计划的详细内容。
queryPlanner.winningPlan.stage:最优执行计划的stage，这里返回是FETCH，可以理解为通过返回的index位置去检索具体的文档（stage有数个模式，将在后文中进行详解）。
queryPlanner.winningPlan.inputStage:用来描述子stage，并且为其父stage提供文档和索引关键字。
queryPlanner.winningPlan.stage的child stage，此处是IXSCAN，表示进行的是index scanning。
queryPlanner.winningPlan.keyPattern:所扫描的index内容，此处是did:1,status:1,modify_time: -1与scid : 1
queryPlanner.winningPlan.indexName：winning plan所选用的index。
queryPlanner.winningPlan.isMultiKey是否是Multikey，此处返回是false，如果索引建立在array上，此处将是true。
queryPlanner.winningPlan.direction：此query的查询顺序，此处是forward，如果用了.sort({modify_time:-1})将显示backward。
queryPlanner.winningPlan.indexBounds:winningplan所扫描的索引范围,如果没有制定范围就是[MaxKey, MinKey]，这主要是直接定位到mongodb的chunck中去查找数据，加快数据读取。
queryPlanner.rejectedPlans：其他执行计划（非最优而被查询优化器reject的）的详细返回，其中具体信息与winningPlan的返回中意义相同，故不在此赘述。
对executionStats返回逐层分析

第一层，executionTimeMillis
最为直观explain返回值是executionTimeMillis值，指的是我们这条语句的执行时间，这个值当然是希望越少越好。
其中有3个executionTimeMillis，分别是：
executionStats.executionTimeMillis 该query的整体查询时间。
executionStats.executionStages.executionTimeMillisEstimate
该查询根据index去检索document获得2001条数据的时间。
executionStats.executionStages.inputStage.executionTimeMillisEstimate
该查询扫描2001行index所用时间。
第二层，index与document扫描数与查询返回条目数 这个主要讨论3个返回项，nReturned、totalKeysExamined、totalDocsExamined，分别代表该条查询返回的条目、索引扫描条目、文档扫描条目。 这些都是直观地影响到executionTimeMillis，我们需要扫描的越少速度越快。 对于一个查询，我们最理想的状态是：nReturned=totalKeysExamined=totalDocsExamined
第三层，stage状态分析 那么又是什么影响到了totalKeysExamined和totalDocsExamined？是stage的类型。类型列举如下：
COLLSCAN：全表扫描
IXSCAN：索引扫描
FETCH：根据索引去检索指定document
SHARD_MERGE：将各个分片返回数据进行merge
SORT：表明在内存中进行了排序
LIMIT：使用limit限制返回数
SKIP：使用skip进行跳过
IDHACK：针对_id进行查询
SHARDING_FILTER：通过mongos对分片数据进行查询
COUNT：利用db.coll.explain().count()之类进行count运算
COUNTSCAN：count不使用Index进行count时的stage返回
COUNT_SCAN：count使用了Index进行count时的stage返回
SUBPLA：未使用到索引的$or查询的stage返回
TEXT：使用全文索引进行查询时候的stage返回
PROJECTION：限定返回字段时候stage的返回
对于普通查询，我希望看到stage的组合(查询的时候尽可能用上索引)：

Fetch+IDHACK
Fetch+ixscan
Limit+（Fetch+ixscan）
PROJECTION+ixscan
SHARDING_FITER+ixscan
COUNT_SCAN
不希望看到包含如下的stage：

COLLSCAN(全表扫描),SORT(使用sort但是无index),不合理的SKIP,SUBPLA(未用到index的$or),COUNTSCAN(不使用index进行count)

### mongodb-4

#### 主从复制
主从复制是一个简单的数据库同步备份的集群技术

在数据库集群中要明确知道谁是主服务器，主服务器只有一台
从服务器要知道自己的数据源也就是知道自己的主服务器是谁
--master用来确定主服务器，--slave和--source 来控制从服务器
masterslave

1.1 主服务器

master.conf

dbpath=E:\ms\master
port=1000
master=true
master.bat

mongod --config master.conf
1.2 从服务器

slave.conf

dbpath=E:\p\slave
port=1001
slave=true
source=127.0.0.1:1000
slave.bat

mongod --config slave.conf
rs.slaveOk();
1.3 主从复制的其它设置项

-only 从节点-> 指定复制某个数据库默认是复制全部数据库
-slavedelay 从节点-> 设置主数据库同步数据的延迟(单位是秒)
-fastsync 从节点-> 以主数据库的节点快照为节点启动从数据库
-autoresync 从节点->如果不同步则重新同步数据库
-oplogSize 主节点->设置oplog的大小(主节点操作记录存储到local的oplog中)
1.4 利用shell动态添加和删除主节点

登录从服务器

use local;
show collections;
db.sources.find();
//{  "host" : "127.0.0.1:8000", "source" : "main", "syncedTo" : Timestamp(1524728329, 1) }
db.sources.insert({host:'127.0.0.1:8000'});//挂载主节点
db.sources.remove({host:'127.0.0.1:8000'});//删除已经挂载的主节点

#### 副本集
MongoDB复制是将数据同步在多个服务器的过程。
复制提供了数据的冗余备份，并在多个服务器上存储数据副本，提高了数据的可用性， 并可以保证数据的安全性。
复制还允许您从硬件故障和服务中断中恢复数据。
2.1 MongoDB复制原理

mongodb的复制至少需要两个节点。其中一个是主节点，负责处理客户端请求，其余的都是从节点，负责复制主节点上的数据。
mongodb各个节点常见的搭配方式为：一主一从、一主多从。
主节点记录在其上的所有操作oplog，从节点定期轮询主节点获取这些操作，然后对自己的数据副本执行这些操作，从而保证从节点的数据与主节点一致。
replication
2.1 流程

一台活跃服务器和二个备份服务器
当活跃服务器出现故障，这时集群根据权重算法推选出出活跃服务器
当原来的主服务器恢复后又会变成从服务器
2.2 配置副本集

A服务器

dbpath=E:\repl\repl1
port=2001
replSet=group
B服务器

dbpath=E:\repl\repl2
port=2002
replSet=group
C服务器

dbpath=E:\repl\repl3
port=2003
replSet=group
2.3 初始化副本集

rs.initiate() 启动一个新的副本集
rs.conf() 查看副本集的配置
rs.status() 命令
use admin;
var conf=
{
    "_id" : "group",
    "members" : [
        { "_id" : 0,  "host" : "127.0.0.1:2001"  },
        { "_id" : 1,  "host" : "127.0.0.1:2002"  },
        { "_id" : 2,  "host" : "127.0.0.1:2003"  }
    ]
}
rs.initiate(conf);
rs.status();
2.4 高级参数

standard 常规节点 参与投票有可能成为活跃节点
passive 副本节点 参与投票，但不能成为活跃节点
arbiter 仲裁节点 只参与投票，不复制节点，也不能成为活跃节点
priority 0到1000之间，0代表是副本节点，1到1000是常规节点
arbiterOnly:true 仲裁节点
2.5 读写分离操作

一般情况下作为副本节点是不能进行数据库操作的，但是在读取密集的系统中读写分离是必要的

 rs.slaveOk();
2.6 Oplog

它被存储在本地数据库local中，会记录每一个操作。 如果希望在故障恢复的时候尽可能更多，可以把这个size设置的大一点

--oplogSize 1024
use local;
 db.oplog.rs.find().limit(2);

#### 分片
在Mongodb里面存在另一种集群，就是分片技术,可以满足MongoDB数据量大量增长的需求。 当MongoDB存储海量的数据时，一台机器可能不足以存储数据，也可能不足以提供可接受的读写吞吐量。这时，我们就可以通过在多台机器上分割数据，使得数据库系统能存储和处理更多的数据。

3.1 分片架构图

sharding

3.2 片键

路由根据片键把不同的文档保存到不同的分片中

3.3 分片的应用场景

单台机器无法存储
单台机器已经不能满足高并发操作
想把尽可能多的数据存放到内存中提高性能
3.4 配置

3.4.1 创建Sharding副本集

mkdir E:\repl\db2001
mongod --port 2001 --dbpath=/data/db2001  --shardsvr --replSet=shard1
mkdir E:\repl/db2002
mongod --port 2002 --dbpath=/data/db2002 --shardsvr --replSet=shard1
# mongo localhost:2001
rs.initiate({_id: 'shard1', members: [{_id: 0, host: 'localhost:2001'}, {_id: 1, host: 'localhost:2002'}]})
rs.isMaster() #查看主从关系
mkdir E:\repl\db2003
mongod --port 2003 --dbpath=E:\repl\db2003  --shardsvr --replSet=shard2
mkdir E:\repl\db2004
mongod --port 2004 --dbpath=E:\repl\db2004 --shardsvr --replSet=shard2
# mongo localhost:2003
rs.initiate({_id: 'shard2', members: [{_id: 0, host: 'localhost:2003'}, {_id: 1, host: 'localhost:2004'}]})
rs.isMaster() #查看主从关系
3.4.2 创建一个配置服务器

mkdir E:\repl\db2005
mongod --port 2005 --dbpath=E:\repl\db2005  --shardsvr --replSet=config
mkdir E:\repl\db2006
mongod --port 2006 --dbpath=E:\repl\db2006  --shardsvr --replSet=config
# mongo localhost:2005
rs.initiate({_id: 'config', members: [{_id: 0, host: 'localhost:2005'}, {_id: 1, host: 'localhost:2006'}]})
rs.isMaster() #查看主从关系
3.4.2 创建路由服务器，并且连接配置服务器

路由器调用mongos命令

mongos --port 2006 --configdb config/localhost:2005,localhost:2006
3.4.3 添加分片数据库

mongo localhost:2006
use admin
> db.runCommand({ addshard: 'shard1/localhost:2001,localhost:2002'})
> db.runCommand({ addshard: 'shard2/localhost:2003,localhost:2004'})
3.4.5 在路由服务器打开数据分片功能

use admin;
> db.runCommand({ enablesharding: 'school'})
> db.runCommand({ shardcollection: 'school.students', key: {name: 1}})

### mongodb-5

#### Mongoose是什么？
Mongoose是MongoDB的一个对象模型工具
同时它也是针对MongoDB操作的一个对象模型库,封装了MongoDB对文档的的一些增删改查等常用方法
让NodeJS操作Mongodb数据库变得更加灵活简单
Mongoose因为封装了MongoDB对文档操作的常用方法，可以高效处理mongodb,还提供了类似Schema的功能，如hook、plugin、virtual、populate等机制。
官网 mongoosejs

#### 使用 mongoose
3.1 安装mongoose

$ cnpm install mongoose -S
3.2 使用mongoose

let mongoose = require("mongoose");
let db = mongoose.createConnection("mongodb://user:pass@ip:port/database",{ useNewUrlParser: true,useUnifiedTopology: true});
user 用户名
pass 密码
ip IP地址
port 端口号
database 数据库
3.3 使用mongoose

let mongoose = require('mongoose');
let connection = mongoose.createConnection("mongodb://127.0.0.1/zfpx",{ useNewUrlParser: true,useUnifiedTopology: true});
connection.on('error', function (error) {
    console.log('数据库连接失败: ' + error);
});
connection.on('open', function (error) {
    console.log('数据库连接成功');
});
3.4 Schema

Schema是数据库集合的模型骨架
定义了集合中的字段的名称和类型以及默认值等信息
3.4.1 Schema.Type

NodeJS中的基本数据类型都属于 Schema.Type
另外Mongoose还定义了自己的类型
基本属性类型有:
字符串(String)
日期型(Date)
数值型(Number)
布尔型(Boolean)
null
数组([])
内嵌文档
3.4.2 定义Schema

 var personSchema = new Schema({
      name:String, //姓名
      binary:Buffer,//二进制
      living:Boolean,//是否活着
      birthday:Date,//生日
      age:Number,//年龄
      _id:Schema.Types.ObjectId,  //主键
      _fk:Schema.Types.ObjectId,  //外键
      array:[],//数组
      arrOfString:[String],//字符串数组
      arrOfNumber:[Number],//数字数组
      arrOfDate:[Date],//日期数组
      arrOfBuffer:[Buffer],//Buffer数组
      arrOfBoolean:[Boolean],//布尔值数组
      arrOfObjectId:[Schema.Types.ObjectId]//对象ID数组
      nested:{ name:String} //内嵌文档
    });

    let p = new Person();
    p.name= 'zfpx';
    p.age = 25;
    p.birthday = new Date();
    p.married = false;
    p.mixed= {any:{other:'other'}};
    p._otherId = new mongoose.Types.ObjectId;
    p.hobby.push('smoking');
    p.ofString.push('string');
    p.ofNumber.pop(3);
    p.ofDates.addToSet(new Date);
    p.ofBuffer.pop();
    p.ofMixed = ['anything',3,{name:'zfpx'}];
    p.nested.name = 'zfpx';

3.4.3 Model

Model是由通过Schema构造而成 除了具有Schema定义的数据库骨架以外，还可以操作数据库 如何通过Schema来创建Model呢，如下:

var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://127.0.0.1/zfpx",{ useNewUrlParser: true,useUnifiedTopology: true});
connection.on('error', function (error) {
    console.log('数据库连接失败: ' + error);
});
connection.on('open', function (error) {
    console.log('数据库连接成功');
});
let PersonSchema = new mongoose.Schema({
      name:String, //姓名
      age:Number,//年龄
});
//两个参数表示定义一个模型
var PersonModel = connection.model("Person", PersonSchema);
// 如果该Model已经定义，则可以直接通过名字获取
var PersonModel = connection.model('Person');//一个参数表示获取已定义的模型
拥有了Model，我们也就拥有了操作数据库的能力 在数据库中的集合名称等于 模型名转小写再转复数,比如 Person>person>people,Child>child>children
3.4.4 Entity简述

通过Model创建的实体，它也可以操作数据库
使用Model创建Entity，如下示例
let personEntity = new PersonModel({
     name : "zhufeng",
     age  : 6
});
console.log(personEntity);//{ _id: 5d9c70438e748c3ae032a7fd, name: 'zhufeng', age: 6 }
Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作,但Model比Entity可以实现的功能更多
3.4.5 保存Entity

let mongoose = require("mongoose");
let conn = mongoose.createConnection("mongodb://127.0.0.1/zfpx",{ useNewUrlParser: true,useUnifiedTopology: true});
let PersonSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0}
});
let PersonModel = conn.model("Person", PersonSchema);

let PersonEntity = new PersonModel({
    name: "zfpx",
    age: 6
});

PersonEntity.save(function (error, doc) {
    if (error) {
        console.log("error :" + error);
    } else {
       //doc是返回刚存的person对象 
        console.log(doc);
    }
});
3.4.6 ObjectId

存储在mongodb集合中的每个文档都有一个默认的主键_id
这个主键名称是固定的，它可以是mongodb支持的任何数据类型，默认是ObjectId 该类型的值由系统自己生成，从某种意义上几乎不会重复
ObjectId使用12字节的存储空间，是一个由24个16进制数字组成的字符串（每个字节可以存储两个16进制数字）
5d9c70b3 f88966 4f24 d9caa5

部分	值	含义
4字节	5d9c70b3	时间戳是自 1970 年 1 月 1 日（08:00:00 GMT）至当前时间的总秒数，它也被称为 Unix 时间戳，单位为秒
3字节	f88966	所在主机的唯一标识符,通常是机器主机名的散列值(hash),可以确保不同主机生成不同的ObjectId不产生冲突
2字节	4f24	产生ObjectId的进程的进程标识符(PID)
3字节	d9caa5	由一个随机数开始的计数器生成的值
let ts = parseInt('5d9c70b3', 16);;
console.log(ts);
let date = new Date(ts*1000);
console.log(date.toLocaleString());

console.log(parseInt('4f24',16));//20260
console.log(parseInt('d9caa5',16))//14273189
前9个字节保证了同一秒钟不同机器不同进程产生的ObjectId是唯一的,最后3个字节是一个自动增加的计数器，确保相同进程同一秒产生的ObjectId也是不一样的,一秒钟最多允许每个进程拥有256的3次方(16777216)个不同的ObjectId 每一个文档都有一个特殊的键_id，这个键在文档所属的集合中是唯一的。
3.5 基础操作

3.5.1 查询

语法

Model.find(查询条件,callback);
代码

Model.find({},function(error,docs){
  //若没有向find传递参数，默认的是显示所有文档
});

Model.find({ "age": 6 }, function (error, docs) {
  if(error){
    console.log("error :" + error);
  }else{
    console.log(docs); //docs: age为6的所有文档
  }
});
3.5.2 Model保存

语法

Model.create(文档数据, callback))
代码

 PersonModel.create({ name:"zfpx", age:7}, function(error,doc){
    if(error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});
`
3.5.3 Entity保存

语法

Entity.save(callback))
代码

var PersonEntity = new PersonModel({name:"zfpx",age: 9});

PersonEntity.save(function(error,doc) {
   if(error) {
      console.log(error);
   } else {
      console.log(doc);
   }
});
3.5.4 更新

语法

Model.update(查询条件,更新对象,callback);
代码

var conditions = {name : 'zfpx'};
  var update = {$set : { age : 100 }};
  PersonModel.update(conditions, update, function(error){
      if(error) {
          console.log(error);
      } else {
          console.log('Update success!');
        }
    });
请注意如果匹配到多条记录，默认只更新一条，如果要更新匹配到的所有记录的话需要加一个参数 {multi:true}

3.5.5 删除

语法

Model.remove(查询条件,callback);
代码

var conditions = { name: 'zfpx' };
PersonModel.remove(conditions, function(error){
    if(error) {
          console.log(error);
    } else {
        console.log('Delete success!');
    }
});
3.5.6 基本查询

3.5.6.1 准备数据

        PersonModel.create([
                          { name:"zfpx1", age:1 },
                          { name:"zfpx2", age:2 },
                          { name:"zfpx3", age:3 },
                          { name:"zfpx4", age:4 },
                          { name:"zfpx5", age:5 },
                          { name:"zfpx6", age:6},
                          { name:"zfpx7", age:7 },
                          { name:"zfpx8", age:8 },
                          { name:"zfpx9", age:9},
                          { name:"zfpx10",age:10 }
                         ], function(error,docs) {
            if(error) {
                console.log(error);
            } else {
                console.log('save ok');
            }
        });
3.5.6.2 属性过滤

语法

find(Conditions,field,callback)
代码

//field省略或为Null，则返回所有属性。
//返回只包含name、age两个键的所有记录
Model.find({},{name:1, age:1, _id:0}，function(err,docs){
   //docs 查询结果集
})
我们只需要把显示的属性设置为大于零的数就可以，当然1是最好理解的，_id是默认返回，如果不要显示加上("_id":0)

3.5.6.3 findOne(查询单条)

与find相同，但只返回单个文档，也就说当查询到即一个符合条件的数据时，将停止继续查询，并返回查询结果 语法

findOne(Conditions,callback)
代码

TestModel.findOne({ age: 6}, function (err, doc){
       // 查询符合age等于6的第一条数据
       // doc是查询结果
});
3.5.6.4 findById(按ID单条数据)

与findOne相同，但它只接收文档的_id作为参数，返回单个文档 语法

findById(_id, callback)
代码

PersonModel.findById(person._id, function (err, doc){
     //doc 查询结果文档
});
3.5.6.5 $gt、$lt(大于、小于)

查询时我们经常会碰到要根据某些字段进行条件筛选查询，比如说Number类型，怎么办呢，我们就可以使用$gt(>)、$lt(<)、$lte(<=)、$gte(>=)操作符进行排除性的查询，如下示例：

Model.find({"age":{"$gt":6}},function(error,docs){
   //查询所有nage大于6的数据
});

Model.find({"age":{"$lt":6}},function(error,docs){
   //查询所有nage小于6的数据
});

Model.find({"age":{"$gt":6,"$lt":9}},function(error,docs){
  //查询所有nage大于6小于9的数据
});
3.5.6.6 $ne(不等于)

$ne(!=)操作符的含义相当于不等于、不包含，查询时我们可通过它进行条件判定，具体使用方法如下：

Model.find({ age:{ $ne:6}},function(error,docs){
  //查询age不等于6的所有数据
});
3.5.6.7 $in(包含)

和$ne操作符相反，$in相当于包含、等于，查询时查找包含于指定字段条件的数据

Model.find({ age:{ $in: 6}},function(error,docs){
   //查询age等于6的所有数据
});

Model.find({ age:{$in:[6,7]}},function(error,docs){
  //可以把多个值组织成一个数组
});
3.5.6.8 $or(或者)

可以查询多个键值的任意给定值，只要满足其中一个就可返回，用于存在多个条件判定的情况下使用，如下示例：

Model.find({"$or":[{"name":"zfpx"},{"age":6}]},function(error,docs){
    //查询name为zfpx或age为6的全部文档
});
3.5.6.9 $exists(是否存在)

$exists操作符，可用于判断某些关键字段是否存在来进行条件查询。如下示例：

Model.find({name: {$exists: true}},function(error,docs){
      //查询所有存在name属性的文档
});

Model.find({email: {$exists: false}},function(error,docs){
      //查询所有不存在email属性的文档
});
3.5.7 高级查询

可以限制结果的数量,跳过部分结果,根据任意键对结果进行各种排序

所有这些选项都要在查询被发送到服务器之前指定

3.5.7.1 limit(限制数量)

在查询操作中,有时数据量会很大,这时我们就需要对返回结果的数量进行限制 那么我们就可以使用limit函数，通过它来限制结果数量。 语法

find(Conditions,fields,options,callback);
代码

Model.find({},null,{limit:20},function(err,docs){
        console.log(docs);
});
如果匹配的结果不到20个，则返回匹配数量的结果，也就是说limit函数指定的是上限而非下限

3.5.7.2 skip(跳过/略过的数量)

skip函数的功能是略过指定数量的匹配结果，返回余下的查询结果 如下示例：

find(Conditions,fields,options,callback);
代码

Model.find({},null,{skip:4},function(err,docs){
        console.log(docs);
});
如果查询结果数量中少于4个的话，则不会返回任何结果。

3.5.7.3 sort函数

sort函数可以将查询结果数据进行排序操作 该函数的参数是一个或多个键/值对 键代表要排序的键名,值代表排序的方向,1是升序,-1是降序 语法

find(Conditions,fields,options,callback)
代码

 Model.find({},null,{sort:{age:-1}},function(err,docs){
      //查询所有数据，并按照age降序顺序返回数据docs
});
sort函数可根据用户自定义条件有选择性的来进行排序显示数据结果。

3.5.7.4 分页查询

Model('User').find({})
  .sort({createAt:-1})
  .skip((pageNum-1)*pageSize)
  .limit(pageSize)
  .populate('user')
  .exec(function(err,docs){
     console.log(docs);
  });
3.5.7.5 populate

var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/201606blog');
//定义课程Schema
var CourseSchema = new mongoose.Schema({
    name:String
});
var CourseModel = mongoose.model('Course',CourseSchema);
var PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    // 外键 别的集合的主键
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course' //指明此外键是哪个集合中的外键
    }
});
var PersonModel = mongoose.model('Person',PersonSchema);
CourseModel.create({name:'node.js'},function(err,course){
    PersonModel.create({name:'zfpx',course:course._id},function(err,doc){
        console.log(doc);
        PersonModel.findById(doc._id).populate('course').exec(function(err,doc){
            console.log(doc);
        })
    })
});

### mongodb-6

#### 扩展mongoose模型
业务分层

service(多个模型)->dao单个模型->model 模型定义
service(多个模型)->dao单个模型->model (模型定义+扩展方法)

#### statics 对类进行扩展
根据用户名查找用户文档

 //this指向model
PersonSchema.statics.findByUsername = function (username, callback) {
    return this.findOne({ username }, callback);
}
Person.findByUsername('zfpx', function (err, doc) {
    console.log(doc);
});

#### methods 对实例进行扩展
PersonSchema.methods.exist = function (callback) {
    let query = { username: this.username, password: this.password };
    return this.model('Person').findOne(query, callback);
}
let person = new Person({ username: 'zfpx', password: '123456', phone: '010-6255889', firstname: 'first', lastname: 'last' });
person.exist(function (err, doc) {
    console.log(err, doc);
});

#### virutal虚拟属性
virtual是虚拟属性的意思，即原来Schema定义里是不存在该属性，后来通过virutal方法赋予的属性。
Schema中定义的属性是要保存到数据库里的，而virtual属性基于已有属性做的二次定义。
模型属性 = Schema定义的属性+virtual属性
PersonSchema.virtual('area').get(function () {
    //this指向实例
    return this.phone.split('-')[0];
});
PersonSchema.virtual('number').get(function () {
    return this.phone.split('-')[1];
});
let Person = conn.model('Person', PersonSchema);
let person = new Person({ username: 'zfpx', password: '123456', phone: '010-6255889', firstname: 'first', lastname: 'last' });
console.log(person.fullname, person.area, person.number);

#### hook
在用户注册保存的时候，需要先把密码通过salt生成hash密码，并再次赋给password

PersonSchema.pre('save', function (next) {
    this.password = crypto.createHmac('sha256', 'zfpx').update(this.password).digest('hex');
    next();
});

PersonSchema.statics.login = function (username, password, callback) {
    password = crypto.createHmac('sha256', 'zfpx').update(password).digest('hex');
    return this.findOne({ username, password }, callback);
}

Person.login('zfpx', '123456', function (err, doc) {
    console.log(err, doc);
});

#### schema 插件
Schemas是可插拔的，也就是说，它们提供在应用预先打包能力来扩展他们的功能。

module.exports = exports = function lastModified(schema,options){
  schema.add({lastModify:Date});
  schema.pre('save',function(next){
    this.lastModify = new Date;
    next();
  });
  if(options&& options.index){
    schema.path('lastModify').index(options.index);
  }
}
let plugin = require('./plugin');
let Person = new Schema({});
Person.plugin(plugin,{index:true});
Person 是用户自己定义的Schema
Person.plugin 是为Person增加plugin
plugin有2个参数
插件对象 plugin
配置项 {index:true}
schema.add({age:Number});

#### MongoDB 聚合
MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)。
MongoDB中聚合的方法使用aggregate()。
7.1 语法

aggregate() 方法的基本语法格式如下所示：
>db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
7.2 分组

现在我们通过以上集合计算每个作者所写的文章数，使用aggregate()计算结果如下：

> db.article.insert({uid:1,content:'1',visit:1});
> db.article.insert({uid:2,content:'2',visit:2});
> db.article.insert({uid:1,content:'3',visit:3});
 db.article.aggregate([{$group:{_id:'$uid',total:{$sum:1}}}]);
 { "_id" : 2, "total" : 1 }
{ "_id" : 1, "total" : 2 }
`
select uid, count(*) total from article group by uid
7.3 聚合的表达式

表达式	描述	实例
$sum	计算总和。	db.article.aggregate([{$group : {_id : "$uid", num_tutorial : {$sum : "$visit"}}}])
$avg	计算平均值	db.article.aggregate([{$group : {_id : "$uid", num_tutorial : {$avg : "$visit"}}}])
$min	获取集合中所有文档对应值得最小值。	db.article.aggregate([{$group : {_id : "$uid", num_tutorial : {$min : "$visit"}}}])
$max	获取集合中所有文档对应值得最大值。	db.article.aggregate([{$group : {_id : "$uid", num_tutorial : {$max : "$visit"}}}])
$push	把某列的所有值都放到一个数组中	db.article.aggregate([{$group : {_id : "$uid", url : {$push: "$url"}}}])
$addToSet	返回一组文档中所有文档所选字段的全部唯一值的数组	db.article.aggregate([{$group : {_id : "$uid", url : {$addToSet : "$url"}}}])
$first	根据资源文档的排序获取第一个文档数据,可能为null	db.article.aggregate([{$group : {_id : "$uid", first_url : {$first : "$url"}}}])
$last	根据资源文档的排序获取最后一个文档数据,可能为null	db.article.aggregate([{$group : {_id : "$uid", last_url : {$last : "$url"}}}])
db.article.insert({uid:1,content:'3',url:'url1'});
db.article.insert({uid:1,content:'4',url:'url1'});
db.article.insert({uid:1,content:'5',url:'url2'});
把某列的所有值都放到一个数组中
db.article.aggregate([{$group : {_id : "$uid", url : {$push: "$url"}}}])
{ "_id" : 1, "url" : [ "url1", "url1", "url2"] }
7.4 管道的概念

管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。 MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

$project：修改输入文档的结构。可以用来重命名、增加或删除字段，也可以用于创建计算结果以及嵌套文档。
$match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作
$limit：用来限制MongoDB聚合管道返回的文档数。
$skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
$unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
$group：将集合中的文档分组，可用于统计结果。
$sort：将输入文档排序后输出。
7.4.1 过滤显示字段

修改输入文档的结构。可以用来重命名、增加或删除字段，也可以用于创建计算结果以及嵌套文档
db.article.aggregate(
  { $project : {
      _id:0,
      content : 1 ,
  }}
);
7.4.2 过滤文档

用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作
db.article.aggregate( [
  { $match : { visit : { $gt : 10, $lte : 200 } } },
  { $group: { _id: '$uid', count: { $sum: 1 } } }
]);
7.4.3 跳过指定数量

在聚合管道中跳过指定数量的文档，并返回余下的文档。 `js var db = connect('school'); var vistors = []; for(var i=1;i<=20;i++){ vistors.push({uid:i,visit:i}); } print(vistors.length); db.vistors.insert(vistors);
db.vistors.aggregate( [ { $match : { visit : { $gt : 10, $lte : 200 } } }, { $group: { _id: '$uid', count: { $sum: 1 } } }, { $skip : 1 } ] );


#### 7.4.5 $unwind
- 将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- 使用$unwind可以将weekday中的每个数据都被分解成一个文档,并且除了weekday的值不同外,其他的值都是相同的
```js
db.vistors.aggregate( [
    { $project : {_id:1,uid:1,type:1,visit:1}},
    { $match : { visit : { $gte : 1, $lte : 10 } } },
    { $unwind:'$type'}
]);
7.4.6 $group

将集合中的文档分组，可用于统计结果。
db.vistors.aggregate( [
  { $project : {_id:1,uid:1,type:1,visit:1}},
  { $match : { visit : { $gte : 1, $lte : 10 } } },
  { $unwind:'$type'},
  { $group: { _id: '$uid', count: { $sum: 1 } } },
  { $sort: {_id:1} },
  { $skip : 5 },
  { $limit: 5 }
]);
7.4.5 Mongoose中使用

Article.aggregate([
                        { $match : { visit : { $gt : 10, $lte : 200 } } },
                        { $group: { _id: '$uid', count: { $sum: 1 } } },
                        { $skip : 1 }
 ])

### MongoDB常见操作
- use 数据库名
- show 数据库名;查看当前数据库:db
- db.dropDatabase()
- show collections
- db.createCollection(集合名)
- db.集合名.insert(文档名)
- db.集合名.save(文档名)
- db.集合名.find(文档名)
- db.集合名.findOne(文档名)
- db.collection.update()
- db.collection.remove()
- $set
- $inc
- $unset
- $push
- $ne
- $addToSet
- $each
- $pop
- $in
- $not
- $gt
- $gte
- $lt
- $lte
- $text
- $search
- and
- or
- limit
- skip
- sort
- array
- where
- cursor

### Mongoose常见操作
- Model.find(查询条件,callback)
- Model.findOne(查询条件,callback)
- Model.findById(_id,callback)
- Model.create(文档数据,callback)
- Model.update(查询条件,更新对象,callback)
- Model.remove(查询条件,callback)
- Entity.save(callback)
- $gt
- $lt
- $ne
- $in
- $or
- $exists
- limit
- skip
- sort
- populate
