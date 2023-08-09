import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    CINEMA_ROUTE, CONTENT_PAGE_ROUTE,
    CONTENT_ROUTE, FILM_SELECTION_ROUTE, GENRE_FILMS_SELECTION_ROUTE,
    LOGIN_ROUTE, PROFILE_ROUTE,
    REGISTRATION_ROUTE, SEARCH_LIST_ROUTE, SERIAL_ROUTE, YEAR_FILMS_SELECTION_ROUTE,
} from "./consts";

import Admin from "../pages/Admin";
import Basket from "../pages/Basket";
import Auth from "../pages/Auth/Auth";
import Cinema from "../pages/Cinema";
import ContentPage from "../components/ContentPage/ContentPage";
import SearchList from "../components/SearchList/SearchList";
import UserProfile from "../components/UserProfile/UserProfile";
import Serial from "../pages/Serial";
import StartPage from "../pages/StartPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: BASKET_ROUTE,
        Component: <Basket/>
    },
    {
        path: `${PROFILE_ROUTE}/:id`,
        Component: <UserProfile/>
    }
];

export const publicRoutes = [
    {
        path: CINEMA_ROUTE,
        Component: <Cinema/>
    },
    {
        path: SERIAL_ROUTE,
        Component: <Serial/>
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
    {
        path: '*',
        Component: <StartPage/>
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

export const serialSelection = [
    {
        path: SERIAL_ROUTE +  GENRE_FILMS_SELECTION_ROUTE,
        Component: <Serial/>
    },
    {
        path: SERIAL_ROUTE +  YEAR_FILMS_SELECTION_ROUTE,
        Component: <Serial/>
    },
];