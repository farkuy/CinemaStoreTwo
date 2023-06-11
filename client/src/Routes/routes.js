import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    CINEMA_ROUTE,
    CONTENT_ROUTE, FILM_SELECTION_ROUTE, GENRE_FILMS_SELECTION_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE, YEAR_FILMS_SELECTION_ROUTE,
} from "./consts";

import Admin from "../pages/Admin";
import Basket from "../pages/Basket";
import Auth from "../pages/Auth/Auth";
import ContentPage from "../pages/ContentPage";
import Cinema from "../pages/Cinema";
import ContentList from "../components/ContentList/ContentList";

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
        path: CONTENT_ROUTE + '/id',
        Component: <ContentPage/>
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
