const { ObjectId, Int32 } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

module.exports.getAllBooks = 
async function(){
    let _result;
    try {
        await mongoClient.connect();

        const db = mongoClient.db("test");
        const collection = db.collection("books");

        result = await collection.find().toArray();
        console.log(result);
        _result = result;

    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
        return _result;
    }
}

module.exports.getBookById = 
async function(id){
    let _result;
    try{
        await mongoClient.connect();

        const db = mongoClient.db("test");
        const collection = db.collection("books");
        let o_id = new ObjectId(id);
        result = await collection.findOne({_id: o_id});

        _result = result;

    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
        return _result;
    }
}

module.exports.addBook = 
async function(_title, _authorSurname, _authorName, _year, _publishing, _pages){
    let _result;
    try{
        await mongoClient.connect();
        const db = mongoClient.db("test");
        const collection = db.collection("books");
        let book = 
        {
            title: _title,
            authorSurname: _authorSurname,
            authorName: _authorName,
            year: Number(_year),
            publishing: _publishing,
            pages: Number(_pages)
        };
        result = await collection.insertOne(book);
        _result = result;
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
        return _result;
    }
}

module.exports.deleteBook =
async function(id){
    let _result;
    try{
        await mongoClient.connect();
        const db = mongoClient.db("test");
        const collection = db.collection("books");
        let o_id = new ObjectId(id);
        result = await collection.deleteOne({_id: o_id});
        _result = result;
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
        return _result;
    }
}

module.exports.editBook = 
async function(_id, _title, _authorSurname, _authorName, _year, _publishing, _pages){
    let _result;
    try{
        await mongoClient.connect();
        const db = mongoClient.db("test");
        const collection = db.collection("books");
        let o_id = new ObjectId(_id);
        result = await collection.findOneAndUpdate({_id: o_id},
            {$set: {
                title: _title,
                authorSurname: _authorSurname,
                authorName: _authorName,
                year: _year,
                publishing: _publishing,
                pages: _pages
            }});
        _result = result;
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
        return _result;
    }
}