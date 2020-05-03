import React, {useState, useEffect} from "react";

import CardDeck from 'react-bootstrap/CardDeck';

import MovieCard from '../movie/movie-card';
import movieService from '../services/movieService';

export default function SearchResults(props) {
  const [movies, setMovies] = useState(undefined)

  useEffect(() => {
    if(!movies) {
      getMovies();
    }
  })

  const getMovies = async () => {
    let res = await movieService.getAll(props.match.params.search);
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