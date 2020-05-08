import React, { useState, useEffect } from "react";
import CardDeck from 'react-bootstrap/CardDeck';

import classnames from 'classnames';

import MovieCard from './movie-card';
import movieService from './movie-service';
import './movie-list.css';

export default function MovieList() {
    const [movies, setMovies] = useState(undefined)
  
    useEffect(() => {
      if(!movies) {
        getMovies();
      }
    })

    const getMovies = async () => {
      let res = await movieService.getAll();
      setMovies(res);
    }
  
    return (
      <div className={classnames('list', {
        'list_isLoading': !movies,
      })}>
        <h3>Movies</h3>
        <p>Click on a movie to start watching or a title to read more.</p>
        <CardDeck>
          {(movies && movies.length > 0) ? (
            movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))):(<p/>)}
        </CardDeck>
      </div>
    )
  }