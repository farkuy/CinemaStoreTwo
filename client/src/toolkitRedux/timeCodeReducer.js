import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: `00:00`,
    counter: true,
};

const timeCodeSlice = createSlice({
    name: 'timeCode',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
            state.counter = !state.counter;
        },
    },
});

export const { setValue } = timeCodeSlice.actions;

export default timeCodeSlice.reducer;