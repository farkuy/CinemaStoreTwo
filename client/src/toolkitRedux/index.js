import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contentReducer from "./contentReducer";
import compilationReducer from "./compilationReducer";
import searchReduser from "./searchReduser";
import timeCodeReducer from "./timeCodeReducer";


const rootReducer = combineReducers({
    content: contentReducer,
    compilation: compilationReducer,
    search: searchReduser,
    timeCode: timeCodeReducer,
})

export const store = configureStore({
    reducer: rootReducer
})

