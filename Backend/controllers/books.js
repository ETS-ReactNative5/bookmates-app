const User = require("../models/User");
const Review = require("../models/Review");
const Book = require("../models/Book");
const axios = require("axios");
const BOOK_API = process.env.BOOK_API;

const search = async (req, res) => {
    axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: req.params.keyword,
        maxResults: 15,
        key: BOOK_API,
        printType: "books",
      },
    }).then(({ data }) => {
        const book_results = data.items.map(item => item.volumeInfo);
        const books = book_results.map(result =>  ({
            title: result.title, 
            author: result.authors,
            description: result.description,
            isbn: result.industryIdentifiers ? (result.industryIdentifiers[0].type === 'ISBN_13' ? result.industryIdentifiers[0].identifier : result.industryIdentifiers[1].identifier) : "" ,
            thumbnail: result.imageLinks ? result.imageLinks.thumbnail : "",
        }))
        return res.status(200).send(books)  
    }).catch((err) => res.status(err).send("No book results"));
};
        

module.exports.search = search;