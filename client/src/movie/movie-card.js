import React from "react";
import {
    Link,
} from "react-router-dom";

import TextTruncate from 'react-text-truncate';

import Card from 'react-bootstrap/Card';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import MoviePoster from './movie-poster';

import './movie-card.css';

export default function MovieCard(props) {
    const movie = props.movie
    return (
        <div key={`${movie._id}`}>
            <Card text="white" className="card">
                <MoviePoster movie={movie} />
                <Link
                    to={{
                        pathname: `/movie/${movie._id}`,
                        state: {movie: movie}
                    }} 
                    style={{color: 'white'}}
                >
                    <Card.Body>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 350, hide: 150 }}
                            overlay={(
                                <Tooltip>
                                {movie.title}
                                </Tooltip>
                            )}
                        >
                            <Card.Title className='card-title'>
                                <TextTruncate
                                    line={1}
                                    text={movie.title}
                                />
                            </Card.Title>
                        </OverlayTrigger>
                        <Card.Subtitle className='card-subtitle'>{new Date(movie.release_date).getFullYear()}</Card.Subtitle>
                    </Card.Body>
                </Link>
            </Card>
        </div>
    );
}