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
      const books = book_results.map((result) => (
        result?.industryIdentifiers ?
        ({
        title: result.title,
        author: result.authors ? result.authors[0] : "Unknown",
        description: result.description ? result.description : "No description available",
        isbn: result.industryIdentifiers,
        isbn: result.industryIdentifiers[0]?.type ? result.industryIdentifiers[0]?.type === "ISBN_13" ? result.industryIdentifiers[0]?.identifier : result.industryIdentifiers[1]?.type ? result.industryIdentifiers[1]?.type === "ISBN_13" ? result.industryIdentifiers[1]?.identifier : ""  : ""  : "", 
        thumbnail: result.imageLinks ? result.imageLinks.thumbnail : "https://www.instandngs4p.eu/wp-content/themes/fox/images/placeholder.jpg",
      })
      :
      ("")));
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
      const updatedBook = await Book.findByIdAndUpdate(savedBook._id, {$push: {author_id: author._id}}, {new: true})
      return res
        .status(200)
        .send({
          message: "Book saved successfully",
          author: author,
          book: updatedBook,
        });
    } else {
      const newAuthor = new Author({ name: req.body.author });
      try {
        await newAuthor.save();
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: req.body.author },
          { $push: { books: savedBook._id } },
          { new: true }
        );
        const updatedBook = await Book.findByIdAndUpdate(savedBook._id, {$push: {author_id: updatedAuthor._id}}, {new: true})
        return res
          .status(200)
          .send({
            message: "Book saved successfully",
            author: updatedAuthor,
            book: updatedBook,
          });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const addCurrently = async (req, res) => { 
  const user = await User.findById(req.user._id);
  try{
    //Update currently reading list
    if (!user.currentlyReadingBooks.includes(req.body.book_id)){
      await user.updateOne({ $push: { currentlyReadingBooks: req.body.book_id} })

      // Remove book from other lists
      if (user.toReadBooks.includes(req.body.book_id)){
        await user.updateOne({ $pull: { toReadBooks: req.body.book_id } })
      }
      if (user.finishedBooks.includes(req.body.book_id)){
        await user.updateOne({ $pull: { finishedBooks: req.body.book_id } })
      }
      return res.status(200).send({message: "Lists successfully updated."})
    }else{
      await user.updateOne({ $pull: { currentlyReadingBooks: req.body.book_id } })
      return res.status(200).send({message: "Book removed from currently reading."})
    }
  }catch(err){
    return res.status(400).send(err)
  }
};

const addFinished = async (req, res) => { 
  const user = await User.findById(req.user._id);
  try{
    //Update finished reading list
    if (!user.finishedBooks.includes(req.body.book_id)){
      await user.updateOne({ $push: { finishedBooks: req.body.book_id} })

      // Remove book from other lists
      if (user.toReadBooks.includes(req.body.book_id)){
        await user.updateOne({ $pull: { toReadBooks: req.body.book_id } })
      }
      if (user.currentlyReadingBooks.includes(req.body.book_id)){
        await user.updateOne({ $pull: { currentlyReadingBooks: req.body.book_id } })
      }
      return res.status(200).send({message: "Lists successfully updated."})
    }else{
      await user.updateOne({ $pull: { finishedBooks: req.body.book_id } })
      return res.status(200).send({message: "Book removed from finished books."})
    }
  }catch(err){
    return res.status(400).send(err)
  }
};

const addToRead = async (req, res) => {
  const user = await User.findById(req.user._id);
  try{
    //Update to-read list
    if (!user.toReadBooks.includes(req.body.book_id)){
      await user.updateOne({ $push: { toReadBooks: req.body.book_id} })

      // Remove book from other lists
      if (user.finishedBooks.includes(req.body.book_id)){
        await user.updateOne({ $pull: { finishedBooks: req.body.book_id } })
      }
      if (user.currentlyReadingBooks.includes(req.body.book_id)){
        await user.updateOne({ $pull: { currentlyReadingBooks: req.body.book_id } })
      }
      return res.status(200).send({message: "Lists successfully updated."})
    }else{
      await user.updateOne({ $pull: { toReadBooks: req.body.book_id } })
      return res.status(200).send({message: "Book removed from to-read books."})
    }
  }catch(err){
    return res.status(400).send(err)
  }
};

const displayBookmatesBookshelf = async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
  
    if(user){
      const currentlyReadingIds = await user.currentlyReadingBooks;
      const toReadIds = await user.toReadBooks;
      const finishedIds = await user.finishedBooks;

      const currentlyReadingBooks = await Promise.all(
        currentlyReadingIds.map((book_id) => {
          return Book.find({ _id: book_id }).populate("author_id", "_id name");
        })
      );
      const toReadBooks = await Promise.all(
        toReadIds.map((book_id) => {
          return Book.find({ _id: book_id }).populate("author_id", "_id name");
        })
      );

      const finishedBooks = await Promise.all(
        finishedIds.map((book_id) => {
          return Book.find({ _id: book_id }).populate("author_id", "_id name");
        })
      );

      const bookshelf = {currentlyReadingBooks, toReadBooks, finishedBooks};

      return res.status(200).send(bookshelf);
    }else{
      return res.status(401).send("Invalid user");
    }
  }catch(err){
    return res.status(400).send(err);
  }

};

const displayMyBookshelf = async (req, res) => {
  try{
    const user = await User.findById(req.user._id);
  
    const currentlyReadingIds = await user.currentlyReadingBooks;
    const toReadIds = await user.toReadBooks;
    const finishedIds = await user.finishedBooks;

    const currentlyReadingBooks = await Promise.all(
      currentlyReadingIds.map((book_id) => {
        return Book.find({ _id: book_id }).populate("author_id", "_id name");
      })
    );
    const toReadBooks = await Promise.all(
      toReadIds.map((book_id) => {
        return Book.find({ _id: book_id }).populate("author_id", "_id name");
      })
    );

    const finishedBooks = await Promise.all(
      finishedIds.map((book_id) => {
        return Book.find({ _id: book_id }).populate("author_id", "_id name");
      })
    );

    const bookshelf = {currentlyReadingBooks, toReadBooks, finishedBooks};

    return res.status(200).send(bookshelf);
  }catch(err){
    return res.status(400).send(err);
  }

};

const suggestions = async (req, res) => {
  const suggestions = await Book.aggregate([{ $sample: { size: 9 } }])

  const populated = await Promise.all(
    suggestions.map((book) => {
      return Book.find({ _id: book._id }).populate("author_id", "name");
    })
  );

  return res.status(200).send(populated);
}

module.exports.search = search;
module.exports.saveBook = saveBook;
module.exports.addCurrently = addCurrently;
module.exports.addFinished = addFinished;
module.exports.addToRead = addToRead;
module.exports.displayMyBookshelf = displayMyBookshelf;
module.exports.displayBookmatesBookshelf = displayBookmatesBookshelf;
module.exports.suggestions = suggestions;
