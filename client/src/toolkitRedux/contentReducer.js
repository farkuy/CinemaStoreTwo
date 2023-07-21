import { createSlice } from '@reduxjs/toolkit';
import {
    CINEMA_ROUTE,
    FILM_SELECTION_ROUTE,
    GENRE_FILMS_SELECTION_ROUTE,
    YEAR_FILMS_SELECTION_ROUTE
} from "../Routes/consts";
import {getGenre} from "../http/kinopoiskApi";
async function getGenres() {
    let res = await getGenre.getAllGenresAndCountry();
    res = await res.genres;
    let genresFinish = await res.filter((genre) => {
        if (genre.genre !== '') {
            return true
        } else return false
    })
    genresFinish = await genresFinish.map((genre) => {
        return {
            name: genre.genre,
            route: `/genre${genre.id}`
        }
    })
    return genresFinish
}
const genres = await getGenres()

const cinemaSlice = createSlice({
    name: 'content',
    initialState: {
        infoFilm: [
            {
                name: 'Top Films',
                route: CINEMA_ROUTE + FILM_SELECTION_ROUTE,
                selectionList: [
                    {
                        name: 'Топ 250 фильмов',
                        route: '/top250Films'
                    },
                    {
                        name: 'Топ 100 самых популярных фильмов',
                        route: '/top100PopularFilms'
                    },
                    {
                        name: 'Топ самых ожидаемых фильмов',
                        route: '/topExpectedMovies'
                    },
                ]
            },
            {
                name: 'Genre',
                route: CINEMA_ROUTE + GENRE_FILMS_SELECTION_ROUTE,
                selectionList: genres,
            },
            {
                name: 'Year',
                route: CINEMA_ROUTE + YEAR_FILMS_SELECTION_ROUTE
            }
        ],

    },
    reducers: {}
});
export default cinemaSlice.reducer;

