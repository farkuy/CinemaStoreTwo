import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contentReducer from "./contentReducer";
import compilationReducer from "./compilationReducer";
import searchReduser from "./searchReduser";

const rootReducer = combineReducers({
    content: contentReducer,
    compilation: compilationReducer,
    search: searchReduser,
})

export const store = configureStore({
    reducer: rootReducer
})

