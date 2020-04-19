const mongoose = require('mongoose');
const Movie = mongoose.model('movie');

module.exports = (app) => {

  app.get(`/api/movie`, async (req, res) => {
    let movies = await Movie.find().sort('title');
    return res.status(200).send(movies);
  });

  app.get(`/api/movie/:id`, async (req, res) => {
    const {id} = req.params;
    
    let movie = await Movie.findById(id);
    return res.status(200).send(movie);
  });

  app.post(`/api/movie`, async (req, res) => {
    let movie = await Movie.create(req.body);
    return res.status(201).send({
      error: false,
      movie
    })
  })

  app.put(`/api/movie/:id`, async (req, res) => {
    const {id} = req.params;

    let movie = await Movie.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      movie
    })

  });

  app.delete(`/api/movie/:id`, async (req, res) => {
    const {id} = req.params;

    let movie = await Movie.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      movie
    })

  })

}