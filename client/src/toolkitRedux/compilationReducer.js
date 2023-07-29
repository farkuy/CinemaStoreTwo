import {createSlice} from "@reduxjs/toolkit";
import {
    getGenre,
    getMostAnticipatedMovies,
    getMovieByGenre,
    getTop100PopularFilms,
    getTop250Movies
} from "../http/kinopoiskApi";
import {movieByGenre, movieReleaseDate} from "../utils/function";


const genresUrls = await movieByGenre();
const yearsUrls = await movieReleaseDate();

const compilation = createSlice({
    name: 'compilation',
    initialState: [
        {
            url: '/top250Films',
            getApi: function (page){
                return getTop250Movies.getTop(page)
            }
        },
        {
            url: '/top100PopularFilms',
            getApi: function (page){
                return getTop100PopularFilms.getTop(page)
            }
        },
        {
            url: '/topExpectedMovies',
            getApi: function (page){
                return getMostAnticipatedMovies.getMostAnticipatedMovies(page)
            }
        },
        [...genresUrls],
        [...yearsUrls]
    ],
    reducers: {}
})

export default compilation.reducer;
