const User = require("../models/User");
const Review = require("../models/Review");
const Book = require("../models/Book");
const Author = require("../models/Author");
const axios = require("axios");
const BOOK_API = process.env.BOOK_API;

const search = async (req, res) => {
  axios
    .get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: req.params.keyword,
        maxResults: 15,
        key: BOOK_API,
        printType: "books",
      },
    })
    .then(({ data }) => {
      const book_results = data.items.map((item) => item.volumeInfo);
      const books = book_results.map((result) => ({
        title: result.title,
        author: result.authors[0],
        description: result.description,
        isbn: result.industryIdentifiers
          ? result.industryIdentifiers[0].type === "ISBN_13"
            ? result.industryIdentifiers[0].identifier
            : result.industryIdentifiers[1].type === "ISBN_13"
            ? result.industryIdentifiers[1].identifier
            : ""
          : "",
        thumbnail: result.imageLinks ? result.imageLinks.thumbnail : "",
      }));
      return res.status(200).send(books);
    })
    .catch((err) =>
      res.status(err).send("Error - No book results. Please try again later.")
    );
};

const saveBook = async (req, res) => {

  const bookExists = await Book.findOne({isbn: req.body.isbn});

  if (bookExists){
    return res
    .status(400)
    .send({
      message: "Book is already saved.",
    });
  }
  const book = new Book(req.body);

  try {
    const savedBook = await book.save();
    const authorExists = await Author.findOne({ name: req.body.author });
    if (authorExists) {
      const author = await Author.findOneAndUpdate(
        { name: req.body.author },
        { $push: { books: savedBook._id } },
        { new: true }
      );
      return res
        .status(200)
        .send({
          message: "Book saved successfully",
          author: author,
          book: savedBook,
        });
    } else {
      const newAuthor = new Author({ name: req.body.author });
      try {
        const savedAuthor = await newAuthor.save();
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: req.body.author },
          { $push: { books: savedBook._id } },
          { new: true }
        );
        return res
          .status(200)
          .send({
            message: "Book saved successfully",
            author: updatedAuthor,
            book: savedBook,
          });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.search = search;
module.exports.saveBook = saveBook;
