import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    CINEMA_ROUTE,
    CONTENT_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
} from "./utils/consts";

import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Auth from "./pages/Auth/Auth";
import ContentPage from "./pages/ContentPage";
import Cinema from "./pages/Cinema";

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