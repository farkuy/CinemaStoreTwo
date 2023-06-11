import {createSlice} from "@reduxjs/toolkit";
import {getTop100PopularFilms, getTop250Movies} from "../http/kinopoiskApi";

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
    ],
    reducers: {}
})

export default compilation.reducer;