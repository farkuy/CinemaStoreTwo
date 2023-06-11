import React from 'react';
import '../Styles/reUseStyle.css'

import SelectionCategoreNavigation from "../components/SelectionCategoryNavigation/SelectionCategoreNavigation";
import {
    CINEMA_ROUTE,
    FILM_SELECTION_ROUTE,
    GENRE_FILMS_SELECTION_ROUTE,
    YEAR_FILMS_SELECTION_ROUTE
} from "../Routes/consts";
import SelectionContentList from "../components/SelectionContetntList/SelectionContentList";

const Cinema = () => {

    const info = [
        {
            name: 'Top Films',
            route: CINEMA_ROUTE + FILM_SELECTION_ROUTE
        },
        {
            name: 'Genre',
            route: CINEMA_ROUTE + GENRE_FILMS_SELECTION_ROUTE
        },
        {
            name: 'Year',
            route: CINEMA_ROUTE + YEAR_FILMS_SELECTION_ROUTE
        },
    ];

    return (
        <div>
            <SelectionCategoreNavigation/>

            <SelectionContentList/>

        </div>
    );
};

export default Cinema;