const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

let search = '';
let pages = 6;

/* GET book listing, create search function and pagination. */
router.get('/', (req, res) => {
  if(req.query.page == null) search = '';
  if(req.query.search) {
    search = req.query.search;
    search = search.toLowerCase();
  }
  let findMatch = { [Op.like]: `%${search}%`};
  Book.findAndCountAll({
    where: {
      [Op.or]: [
        { title: findMatch },
        { author: findMatch },
        { genre: findMatch },
        { year: findMatch },
      ]
    },
    order: [
      ['year', 'DESC']
    ],
    limit: pages,
    offset: req.query.page ? Number(req.query.page - 1) * pages : 0
  })
  .then(books => {
    res.render('index', {
      books: books.rows,
      pages: Number(books.count / pages),
    });
  })
  .catch(err => { throw err; });
});

/* Create a new book form. */
router.get('/new', (req, res) => {
  res.render("books/new-book", { book: {}, title: "New Book" });
});

/* POST create book. */
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
  book = await Book.create(req.body);
  res.redirect("/books");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("books/new-book", { book: book, errors: error.errors, title: "New Book"})
    } else {
      throw error;
    }
  }
}));

/* Edit book. */
router.get("/:id", asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("books/update-book", { book: book, title: "Edit Book" });
  } else {
    let err = new Error('This book does not exist');
    err.status = 500;
    res.render('error');
    next(err);
  }
}));


/* Update a book. */
router.post('/:id', asyncHandler(async (req, res) => {
  let book;
  try {
  book = await Book.findByPk(req.params.id);
  if(book) {
    await book.update(req.body);
    res.redirect("/books");
  } else {
    res.sendStatus(404);
  }
} catch (error) {
  if(error.name === "SequelizeValidationError") {
    book = await Book.build(req.body);
    book.id = req.params.id;
    res.render("books/update-book", { book: book, errors: error.errors, title: "Edit Article"})
  } else {
    throw error;
  }
}
}));

/* Delete book form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render('books/delete', { book });
  } else {
    res.sendStatus(404);
  }
}));

/* Delete individual book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect('/books');
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;