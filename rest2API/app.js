const express = require("express");
const cors = require('cors');
const db = require("./db_controller");
const app = express();
app.use(cors());
const port = 5000;

// отримання книг певного автора за його іменем 
app.get("/authorbooks", cors(), async function(request,response)
{
    let authorName = request.query.authorname;
    let authorSurname = request.query.authorsurname;
    //отримання інформації з бази mongoDB
    result = await db.getBookByAuthor(authorName, authorSurname);
    response.send(result);
});

app.listen(port);

