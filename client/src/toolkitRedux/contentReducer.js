import { createSlice } from '@reduxjs/toolkit';
import {
    CINEMA_ROUTE,
    FILM_SELECTION_ROUTE,
    GENRE_FILMS_SELECTION_ROUTE,
    YEAR_FILMS_SELECTION_ROUTE
} from "../Routes/consts";
import {getGenres, getReleaseDate} from "../utils/function";


const genres = await getGenres()
const years = await getReleaseDate(1895)

const cinemaSlice = createSlice({
    name: 'content',
    initialState: {
        infoFilm: [
            {
                name: 'Top Films',
                route: CINEMA_ROUTE + FILM_SELECTION_ROUTE,
                changeValue: 0,
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
                changeValue: 1,
                selectionList: genres,
            },
            {
                name: 'Year',
                route: CINEMA_ROUTE + YEAR_FILMS_SELECTION_ROUTE,
                changeValue: 2,
                selectionList: years,
            }
        ],

    },
    reducers: {}
});
export default cinemaSlice.reducer;

