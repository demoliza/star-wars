const express = require("express");
const router = express.Router();
const Movie = require('../controllers/Movie');


//Get all movies.
router.get('/', async (req,res) => {
    let movies = await new Movie().getMovies();
    return res.render('home',{movies});
});

//Create a movie comment.
router.post('/comment', async (req,res) => {
    console.log('Content:', req.body);
    let {episode_id, comment} = req.body;
    await new Movie().createComment({episode_id, comment},res);
});

module.exports = router;