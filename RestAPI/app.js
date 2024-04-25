const express = require("express");
const cors = require('cors');
const db = require("./db_controller");
const jsonParser = express.json();
const app = express();

const port = 3000;

//додаємо механізм міжресурсної взаємодії
app.use(cors());

// отримання списку всіх книг
app.get("/book/all",cors(),async function(request, response)
{
    //отримання інформації з бази mongoDB
    result = JSON.stringify(await db.getAllBooks()) ;
    response.send(JSON.stringify(result));
});

// отримання певної книги за її id 
app.get("/book",cors(), async function(request,response)
{
    let id = request.query.id;
    //отримання інформації з бази mongoDB
    result = await db.getBookById(id);
    response.send(result);
});

// додавання нової книги в базу
app.put("/book/add",cors(), jsonParser, async function(request,response)
{
    
    let title = request.body.title;
    let authorSurname = request.body.authorsurname;
    let authorName = request.body.authorname;
    let year = request.body.year;
    let publishing = request.body.publishing;
    let pages = request.body.pages;

    result = await db.addBook(title, authorSurname, authorName, year, publishing, pages);
    response.send(JSON.stringify(result));
});

// видалення книжки з бази
app.delete("/book/delete",cors(),async function(request,response)
{
    let id = request.query.id;
    result = await db.deleteBook(id);
    response.send(JSON.stringify(result));
});

// зміна даних книги за її id 
app.post("/book/edit", cors(),jsonParser, async function(request,response)
{
    let id = request.body.id;
    let title = request.body.title;
    let authorSurname = request.body.authorsurname;
    let authorName = request.body.authorname;
    let year = request.body.year;
    let publishing = request.body.publishing;
    let pages = request.body.pages;

    result = await db.editBook(id, title, authorSurname, authorName, year, publishing, pages);
    response.send(JSON.stringify(result));
});

app.listen(port);

