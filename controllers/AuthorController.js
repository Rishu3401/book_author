var db=require('../models/config')
var User=db.Author;
var d=db.Book;
const {QueryTypes,Sequelize} = require('sequelize');

const updateAuthor = async (req, res) => {
    const authorName = req.params.authorName;
    const bookID = req.params.bookID;
    const { dateOfBirth, country, title, publicationYear, price } = req.body;
  
    try {
      const author = await db.Author.findOne({
        where: {
          AuthorName: authorName
        }
      });
  
      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }
  
      author.DateOfBirth = dateOfBirth || author.DateOfBirth;
      author.Country = country || author.Country;
  
      await author.save();

      if (bookID) {
        var book = await db.Book.findOne({
          where: {
            AuthorName: authorName,
            BookID: bookID
          }
        });
  
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
  
        book.Title = title || book.Title;
        book.PublicationYear = publicationYear || book.PublicationYear;
        book.Price = price || book.Price;

        await book.save();
      }
  
      res.status(200).json({ message: 'Author and book updated successfully', data: { author, book } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while updating the author and book' });
    }
  };
  


  var deleteAuthorsid = async (req, res) => {
    const authorId = req.params.bookID;
  
    try {
      await db.Book.destroy({
        where: {
            bookID: authorId
        }
      });
  
      res.status(200).json({ message: 'Author and associated book data deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while deleting the author' });
    }
  };
  
  
  var getAuthors = async (req, res) => {
    try {
      const authors = await User.findAll({
        attributes: ['AuthorName', 'DateOfBirth', 'Country'],
        include: {
          model: d,
          attributes: ['BookID', 'Title', 'PublicationYear', 'Price']
        }
      });
      res.status(200).json({ data: authors });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching authors' });
    }
  };
  
 var getAuthor = async (req, res) => {
    const Data = await d.findOne({
        where:{
            authorName:req.params.authorName
        }
    });
    res.status(200).json({ data:Data });
 }



 var getbook = async (req, res) => {
    const Data = await d.findOne({
        where:{
            bookName:req.params.bookName
        }
    });
    res.status(200).json({ data:Data });
 }





var deleteAuthor = async (req, res) => {
    const authorName = req.params.authorName;
  
    try {
      await db.Author.destroy({
        where: {
          AuthorName: authorName
        }
      });

      await db.Book.destroy({
        where: {
          AuthorName: authorName
        }
      });
  
      res.status(200).json({ message: 'Author and associated book data deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while deleting the author' });
    }
  };


const addBook = async (req, res) => {
  try {
    const { authorName, dateOfBirth, country, bookID, bookTitle, publicationYear, price } = req.body;
    const [author, created] = await db.Author.findOrCreate({
      where: { AuthorName: authorName },
      defaults: { DateOfBirth: dateOfBirth, Country: country }
    });


    const book = await db.Book.create({
      BookID: bookID, 
      Title: bookTitle,
      AuthorName: author.AuthorName,
      PublicationYear: publicationYear,
      Price: price
    });

    res.status(200).json({ message: 'Author and book added successfully', data: { author, book } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while adding the author and book' });
  }
};

  
 
module.exports={
    getAuthors,
    getAuthor,
    deleteAuthorsid,
    getbook,
    addBook,
    deleteAuthor,
    updateAuthor
}
