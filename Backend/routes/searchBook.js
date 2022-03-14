const router = require("express").Router();
const axios = require("axios");
const BOOK_API = process.env.BOOK_API;

router.get("/search-book/:keyword", (req, res) => {
  axios
    .get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: req.params.keyword,
        maxResults: 5,
        key: BOOK_API,
        printType: "books",
      },
    })
    .then(({ data }) => {
      res.status(200).send(data.items);
    })
    .catch((err) => res.status(err.response.status).send("No book results"));
});

module.exports = router;
