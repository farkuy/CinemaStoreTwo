import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contentReducer from "./contentReducer";
import compilationReducer from "./compilationReducer";

const rootReducer = combineReducers({
    content: contentReducer,
    compilation: compilationReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

