import { createSlice } from '@reduxjs/toolkit';
import {
    CINEMA_ROUTE,
    FILM_SELECTION_ROUTE,
    GENRE_FILMS_SELECTION_ROUTE,
    YEAR_FILMS_SELECTION_ROUTE
} from "../Routes/consts";

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
                route: CINEMA_ROUTE + GENRE_FILMS_SELECTION_ROUTE
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

