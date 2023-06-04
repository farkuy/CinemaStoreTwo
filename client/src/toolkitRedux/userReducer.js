import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        user: {},
    },
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;