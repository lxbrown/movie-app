const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')
const http = require('http')
const ptt = require("parse-torrent-title");

const tmdb = require('tmdbv3').init(process.env.TMDB_KEY);
var directory = process.env.MOVIE_DIRECTORY

const Movie = mongoose.model('movie');

module.exports = (app) => {
  app.get(`/api/movie`, async (req, res) => {
    let query = {}
    if (req.query.search != undefined) {
      query = {
        "title" : {$regex : new RegExp(".*" + req.query.search + ".*", "i")}
      }
    }
    
    let movies = await Movie.find(query).sort('title').lean();
    return res.status(200).send(movies);
  });

  app.get(`/api/movie/:id`, async (req, res) => {
    const {id} = req.params;
    
    let movie = await Movie.findById(id).lean();
    return res.status(200).send(movie);
  });

  app.get(`/api/movie/:id/poster`, async (req, res) => {
    const {id} = req.params;
    return res.status(200).sendFile(path.join(__dirname, '../assets/posters/' + id + '.jpg'));
  });

  app.get('/api/stream/:id', async (req, res, next) => {
    const {id} = req.params;
    let movie = await Movie.findById(id).lean();

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

  app.post(`/api/refresh`, async (req, res) => {
    function scanDirectory(directory, callback) {
        fs.readdir(directory, {withFileTypes: true}, (err, files) => {
            if (err) {
                throw err
            }
            files.forEach((dirent) => {
                if(dirent.isDirectory()) {
                    return setTimeout(scanDirectory, 500, path.join(directory, dirent.name), callback)
                }
    
                callback(dirent.name, directory)
            });
        });
    }

    function addToDb(fileName, directory) {
      var titleInfo = ptt.parse(fileName)
      if (titleInfo.container === undefined || titleInfo.season !== undefined){
          return
      }

      tmdb.search.movie(titleInfo.title, 1, (err ,res) => {
        if (err) {
            console.log(err)
            return
        }
        if (res.results.length === 0) return

        const file_path = path.join(directory, fileName)
        res.results[0]._path = file_path

        Movie.findOne({id: res.results[0].id}, (err, found) => {
          if (!found) {
            Movie.create(res.results[0]).then(result => {
              const poster_path = path.join(__dirname, '../assets/posters', result._id + '.jpg')
              const file = fs.createWriteStream(poster_path);
              http.get('http://image.tmdb.org/t/p/w500' + result.poster_path, function(response) {
                response.pipe(file);
              });
            })
          }
        })
      });
    }
    
    scanDirectory(directory, addToDb)

    return res.status(200).send('response');
  });
}