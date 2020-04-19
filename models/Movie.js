const mongoose = require('mongoose');
const {Schema} = mongoose;

const movieSchema = new Schema({
    poster_path: String,
    adult: Boolean,
    overview: String,
    release_date: String,
    genre_ids: [Number],
    id: Number,
    original_title: String,
    original_language: String,
    title: String,
    backdrop_path: String || undefined,
    popularity: Number,
    vote_count: Number,
    video: Boolean,
    vote_average: Number,
    _path: String,
})

mongoose.model('movie', movieSchema);