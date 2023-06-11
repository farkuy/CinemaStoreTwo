import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import contentReducer from "./contentReducer";
import compilationReducer from "./compilationReducer";

const rootReducer = combineReducers({
    user: userReducer,
    content: contentReducer,
    compilation: compilationReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

