import React from "react";
import {
    Link,
} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LazyLoad from "react-lazyload";

import './movie-poster.css';

export default function MovieCard(props) {
    const movie = props.movie
    return (
        <Link to={`/stream/${movie._id}`} className="image-container">
            <LazyLoad height={200}>
                <Card.Img variant="top" src={`/api/movie/${movie._id}/poster`} className="image"/>
                <Button variant="link" className="overlay">
                    <img src={`${process.env.PUBLIC_URL}/assets/play.svg`} alt="Play"  className="icon"/>
                </Button>
            </LazyLoad>
        </Link>
    );
}