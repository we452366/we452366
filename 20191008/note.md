## MongoDB

### 常见操作
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
- 


## Mongoose

### 常见操作
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
