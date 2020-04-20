import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import './App.css'

import movieService from './services/movieService';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id/stream">
          <MovieStream />
        </Route>
        <Route path="/:id">
          <MovieDetail />
        </Route>
        <Route path="/">
          <MovieList />
        </Route>
      </Switch>
    </Router>
  );
}


function MovieList() {
  const [movies, setmovies] = useState(null);

  useEffect(() => {
    if(!movies) {
      getMovies();
    }
  })

  const getMovies = async () => {
    let res = await movieService.getAll();
    setmovies(res);
  }

  const renderMovie = movie => {
    return (
      <a  key={movie._id} className="list__item movie">
        <Link to={`/${movie._id}`}>{movie.title}</Link>
      </a>
    );
  };

  return (
    <div className="App">
      <div className="list">
        {(movies && movies.length > 0) ? (
          movies.map(movie => renderMovie(movie))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  )
}

function MovieDetail() {
  let { id } = useParams();
  const [movie, setmovie] = useState(null);

  useEffect(() => {
    if(!movie) {
      getMovie();
    }
  })

  const getMovie = async () => {
    let res = await movieService.getById(id);
    setmovie(res);
  }

  return (
    <div>
      {(movie) ? (
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
        <Link to={`/${movie._id}/stream`}>Play movie</Link>
      </div>
      ) : (
        <p>no movie</p>
      )}
    </div>
  );
}

function MovieStream() {
  let { id } = useParams();

  return (
    <div>
      <video id="videoPlayer" class="player" controls autoPlay> 
        <source src={"/api/movie/" + id + "/stream"} type="video/mp4" />
      </video>
    </div>
  );
}

export default App;