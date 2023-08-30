import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comment: [],
    counter: true,
};

const timeCodeCommentSlice = createSlice({
    name: 'timeCodeComment',
    initialState,
    reducers: {
        setValueComment: (state, action) => {
            state.comment = action.payload;
            state.counter = !state.counter;
        },
    },
});

export const { setValueComment } = timeCodeCommentSlice.actions;

export default timeCodeCommentSlice.reducer;