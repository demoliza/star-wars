const express = require("express");
const router = express.Router();
const Movie = require('../controllers/Movie');

//Get all movies.
router.get('/', async (req,res) => {
    let movies = await new Movie().getMovies();
    return res.render('home',{movies});
});

//Create a movie comment.
router.post('/comment/:id', async (req,res) => {
});

module.exports = router;