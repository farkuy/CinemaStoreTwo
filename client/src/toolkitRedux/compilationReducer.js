import {createSlice} from "@reduxjs/toolkit";
import {
    getGenre,
    getMostAnticipatedMovies,
    getMovieByGenre,
    getTop100PopularFilms,
    getTop250Movies
} from "../http/kinopoiskApi";

async function movieByGenre() {
    let res = await getGenre.getAllGenresAndCountry();
    res = await res.genres;

    let genreUrlObj = await res.filter((genre) => {
        if (genre.genre !== '') {
            return true
        } else return false
    });
    genreUrlObj = await genreUrlObj.map((genreObj) => {
        return {
            url: `/genre${genreObj.id}`,
            getApi: function (page){
                return getMovieByGenre.getMovieByGenre(genreObj.id, page)
            }
        }
    });

    return genreUrlObj;
}

const genresUrls = await movieByGenre();
console.log(genresUrls)

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
        [...genresUrls]
    ],
    reducers: {}
})

export default compilation.reducer;

/*
{
    "filmId": 474,
    "nameRu": "Гладиатор",
    "nameEn": "Gladiator",
    "year": "2000",
    "filmLength": "02:35",
    "countries": [
    {
        "country": "США"
    },
    {
        "country": "Великобритания"
    },
    {
        "country": "Мальта"
    },
    {
        "country": "Марокко"
    }
],
    "genres": [
    {
        "genre": "драма"
    },
    {
        "genre": "приключения"
    },
    {
        "genre": "боевик"
    },
    {
        "genre": "история"
    }
],
    "rating": "8.6",
    "ratingVoteCount": 625178,
    "posterUrl": "https://kinopoiskapiunofficial.tech/images/posters/kp/474.jpg",
    "posterUrlPreview": "https://kinopoiskapiunofficial.tech/images/posters/kp_small/474.jpg",
    "ratingChange": null,
    "isRatingUp": null,
    "isAfisha": 0
}*/
