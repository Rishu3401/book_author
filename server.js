const express = require('express')
const app = express()
const cors = require('cors');
var bodyParser = require('body-parser')
var authorcontroller=require('./controllers/AuthorController')
require('./models/config')
app.use(bodyParser.json())
app.use(cors());


app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/getAuthors', authorcontroller.getAuthors)
app.get('/getAuthor/:authorName', authorcontroller.getAuthor)
app.get('/getbook/:bookName', authorcontroller.getbook)
app.delete('/deleteAuthorsid/:bookID', authorcontroller.deleteAuthorsid)
app.post('/addBook', authorcontroller.addBook)
app.delete('/deleteAuthor/:authorName', authorcontroller.deleteAuthor);
app.patch('/updateAuthor/:authorName/:bookID',authorcontroller.updateAuthor)


app.listen(3000,()=>{
    console.log('app will run');
})