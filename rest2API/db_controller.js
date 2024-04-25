const { ObjectId, Int32 } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);

module.exports.getBookByAuthor = 
async function(_authorName,_authorSurname){
    let _result;
    try{
        await mongoClient.connect();
        const db = mongoClient.db("test");
        const collection = db.collection("books");
        result = await collection.find({authorSurname: _authorSurname, authorName: _authorName}).toArray();

        _result = result;
        console.log(result);

    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
        return _result;
    }
}
