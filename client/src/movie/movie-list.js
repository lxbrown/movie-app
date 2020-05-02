import React, { useState, useEffect } from "react";
import CardDeck from 'react-bootstrap/CardDeck';

import MovieCard from './movie-card';
import movieService from '../services/movieService';

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
      <div className="App">
        <CardDeck style={{ justifyContent: 'space-between' }}>
          {(movies && movies.length > 0) ? (
            movies.map(movie => MovieCard(movie))
          ) : (
            <p>No movies found</p>
          )}
        </CardDeck>
      </div>
    )
  }