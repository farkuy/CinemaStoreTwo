import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    CINEMA_ROUTE, CONTENT_PAGE_ROUTE,
    CONTENT_ROUTE, FILM_SELECTION_ROUTE, GENRE_FILMS_SELECTION_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE, SEARCH_LIST_ROUTE, YEAR_FILMS_SELECTION_ROUTE,
} from "./consts";

import Admin from "../pages/Admin";
import Basket from "../pages/Basket";
import Auth from "../pages/Auth/Auth";
import Cinema from "../pages/Cinema";
import ContentPage from "../components/ContentPage/ContentPage";
import SearchList from "../components/SearchList/SearchList";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: BASKET_ROUTE,
        Component: <Basket/>
    },
];

export const publicRoutes = [
    {
        path: CINEMA_ROUTE,
        Component: <Cinema/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>
    },
    {
        path: `${CONTENT_ROUTE}/:id`,
        Component: <ContentPage/>
    },
    {
        path: SEARCH_LIST_ROUTE,
        Component: <SearchList/>
    },
];

export const filmSelection = [
    {
        path: CINEMA_ROUTE +  FILM_SELECTION_ROUTE,
        Component: <Cinema/>
    },
    {
        path: CINEMA_ROUTE +  GENRE_FILMS_SELECTION_ROUTE,
        Component: <Cinema/>
    },
    {
        path: CINEMA_ROUTE +  YEAR_FILMS_SELECTION_ROUTE,
        Component: <Cinema/>
    },
];
