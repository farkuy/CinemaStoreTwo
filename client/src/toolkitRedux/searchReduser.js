import {createSlice} from "@reduxjs/toolkit";

const compilation = createSlice({
    name: 'search',
    initialState: localStorage.getItem('search'),
    reducers: {
        updateSearch: (state, action) => {
            return action.payload;
        }
    }
})

export const { updateSearch } = compilation.actions;

export default compilation.reducer;