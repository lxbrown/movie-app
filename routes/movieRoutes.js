const mongoose = require('mongoose');
const fs = require('fs');
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

  app.get('/api/movie/:id/stream', async (req, res, next) => {
    const {id} = req.params;
    let movie = await Movie.findById(id);
    console.log(movie)

    const path = movie._path
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1

      if(start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
        return
      }
      
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
    })
}