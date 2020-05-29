import React, {useState, useEffect} from "react";

import CardDeck from 'react-bootstrap/CardDeck';

import MovieCard from '../movie/movie-card';
import movieService from '../movie/movie-service';

export default function SearchResults(props) {
  const [movies, setMovies] = useState(undefined)
  const [searchText, setSearchText] = useState(undefined)

  useEffect(() => {
    if(!movies || props.match.params.search !== searchText) {
      getMovies();
    }
  })

  const getMovies = async () => {
    setSearchText(props.match.params.search)
    let res = await movieService.getAll(props.match.params.search);
    setMovies(res);
  }

  return (
    <div>
      <CardDeck>
        {(movies && movies.length > 0) ? 
            movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            )):(<p>No results!</p>)}
      </CardDeck>
    </div>
  )
}