'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Movie = require('../models/movie');
const Director = require('../models/director');

/* GET movies list */
router.get('/', (req, res, next) => {
  Movie.find({})
    .then((result) => {
      const data = {
        movies: result
      };
      res.render('movies', data);
    })
    .catch(next);
});

/** GET movie detail */
router.get('/movies/:movieId', (req, res, next) => {
  // validate mongo id and send 404 if invalid
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    res.status(404);
    res.render('not-found');
    return;
  }

  Movie.findById(req.params.movieId)
    .then((result) => {
      if (!result) {
        res.status(404);
        res.render('not-found');
        return;
      }
      const data = {
        movie: result
      };
      res.render('movie-detail', data);
    })
    .catch(next);
});

/** GET movie create */
router.get('/movie/create', (req, res, next) => {
  // if there's no user logged not possible to render the page
  if (!req.session.user) {
    return req.redirect('/auth/login');
  }
  res.render('movie-create');
});

/** POST save new movie to db */
router.post('/movies', (req, res, next) => {
  console.log(req.body);
  const movie = new Movie(req.body);
  movie.save()
    .then(() => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch(next);
});

/** POST delete movie */
router.post('/movies/:movieId/delete', (req, res, next) => {
  Movie.remove({ _id: req.params.movieId })
    .then((result) => {
      res.redirect('/');
    })
    .catch(next);
});

/** GET director add  */
router.get('/director/add', (req, res, next) => {
  res.render('director-add');
});

/** POST add new director */
router.post('/director/add', (req, res, next) => {
  const director = new Director(req.body);
  director.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
});

module.exports = router;
