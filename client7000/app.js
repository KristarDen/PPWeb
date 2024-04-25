const express = require("express");
const multer = require("multer");
const axios = require('axios').default;
const app = express();
const port = 7000;
const fs = require('fs');
const api_book_url = "http://127.0.0.1:3000";
const api_author_url = "http://127.0.0.1:5000"

app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.use(multer({dest:"./public/images"}).single("filedata"));

//Список усіх книг
app.get("/",  async function(request,response)
{
    let _data ="";
    _data = await getAllBooks();
    let data = JSON.parse(_data);
    response.render("main",{data: data}); 
});

//Данні про певну книгу по її id
app.get("/book", async function(request,response)
{
    let id = request.query.id;
    book = await getBook(id);
    response.render("book",
        {book: book});
});

//Сторінка з формою додавання нової книги
app.get("/addbookform",async function(request,response){
  response.render("addbook");
});

//Усі книги певного автора
app.get("/author",async function(request,response)
{
    let _data ="";
    _data = await getAuthorsBook(request.query.authorname, request.query.authorsurname);
    response.render("author",{data: _data});
});

//Додавання нової книги в базу та її обкладинки
app.post("/addbook", async function (request, response, next) {
  let filedata = request.file;
  if(!filedata){
    response.send("Ошибка при загрузке файла");
  }
  else{
    let dataJSON = await addBook(request.body.title, 
      request.body.authorname, 
      request.body.authorsurname, 
      request.body.year, 
      request.body.publishing, 
      request.body.pages);
    fs.rename(`./public/images/${filedata.filename}`, `./public/images/${dataJSON.insertedId}.jpg`, 
    err => {
      if(err) throw err; // не удалось переименовать файл
      console.log('Файл успешно переименован');
    });
    response.redirect(`/book?id=${dataJSON.insertedId}`);
  }
})

//запит на отримання списку книг від restapi 
async function getAllBooks() 
{
    try 
    {
      const response = await axios.get(`${api_book_url}/book/all`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

//запит на отримання даних про певну книгу по id від restapi 
async function getBook(id)
{
    try 
    {
      const response = await axios.get(`${api_book_url}/book?id=${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

async function getAuthorsBook(firstname, surname)
{
  try 
  {
    const response = await axios.get(`${api_author_url}/authorbooks?authorname=${firstname}&authorsurname=${surname}`);
    console.log(response);
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

async function addBook(title, authorName, authorSurname, year, publishing, pages)
{
  try 
  {
    let data = {
      title: `${title}`, 
      authorsurname: `${authorSurname}`, 
      authorname: `${authorName}`, 
      year: `${year}`, 
      publishing: `${publishing}`, 
      pages: `${pages}`
    };
    const response = await axios.put(`${api_book_url}/book/add`, data);
    //console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
app.listen(port);