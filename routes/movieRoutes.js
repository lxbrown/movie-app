const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')
const http = require('http')
const ptt = require("parse-torrent-title");

const tmdb = require('tmdbv3').init(process.env.TMDB_KEY);

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
    var walk = function(dir, done) {
      var results = [];
      fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach((file) => {
          file = path.resolve(dir, file);
          fs.stat(file, (err, stat) => {
            if (stat && stat.isDirectory()) {
              walk(file, function(err, res) {
                results = results.concat(res);
                if (!--pending) done(null, results);
              });
            } else {
              results.push(file);
              if (!--pending) done(null, results);
            }
          });
        });
      });
    };

    function pickBest(a, b) {
      if (!a) return b
      if (!b) return a
      //.mp4 is supported by all browsers, other formats only work on Chrome
      if (a.info.container === 'mp4' && b.info.container !== 'mp4') return a
      else if (a.info.container !== 'mp4' && b.info.container === 'mp4') return b
      //Higher resolution is better
      if (parseInt(a.info.resolution) > parseInt(b.info.resolution)) return a
      else if (parseInt(b.info.resolution) > parseInt(a.info.resolution)) return b
      //Default to first one
      return a
    }

    walk(process.env.MOVIE_DIRECTORY, (err, results) => {
      if (err) throw err;

      let titles = {}
      results.forEach(result => {
        let titleInfo = ptt.parse(path.basename(result).replace('- Copy', ''))
        //Skip tv shows, anything that came back without a video file format,
        //or .avi files (can't be played in a browser)
        if (titleInfo.season !== undefined || titleInfo.container === undefined || titleInfo.container === 'avi') {
            return
        }
        
        titles[titleInfo.title] = pickBest(titles[titleInfo.title], {info: titleInfo, path: result})
      });

      Movie.deleteMany({}).then(() => {
        Object.values(titles).forEach(entry => {
          tmdb.search.movie(entry.info.title, 1, (err ,res) => {
            if (err) throw err
            if (res.results.length === 0) return

            //Try matching the result based on release date. If no matches, go with the first result
            let newDocument = res.results[0]
            for (i=0;i < res.results.length; i++) {
              if (res.results[i].release_date && parseInt(res.results[i].release_date) === entry.info.year) {
                newDocument = res.results[i]
                break
              }
            }
            
            newDocument._path = entry.path
            Movie.findOneAndReplace({id: newDocument.id}, newDocument, {upsert: true, returnNewDocument: true}, (err, result) => {
              //Workaround because mongoose doesn't support findOneAndReplace returning the new document yet
              if (!result) {
                Movie.findOne({id: newDocument.id}).then(result => {
                  const poster_path = path.join(__dirname, '../assets/posters', result._id + '.jpg')
                  const file = fs.createWriteStream(poster_path);
                  http.get('http://image.tmdb.org/t/p/w500' + result.poster_path, function(response) {
                    response.pipe(file);
                  });
                })
              }
              else {
                const poster_path = path.join(__dirname, '../assets/posters', result._id + '.jpg')
                const file = fs.createWriteStream(poster_path);
                http.get('http://image.tmdb.org/t/p/w500' + result.poster_path, function(response) {
                  response.pipe(file);
                });
              }
            })
          });
        })
      })
    });

    return res.status(200).send('response');
  });
}