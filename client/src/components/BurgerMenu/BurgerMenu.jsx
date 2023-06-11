import React from 'react';
import './BurgerMenuStyle.css'
import {NavLink} from "react-router-dom";
import {CINEMA_ROUTE, FILM_SELECTION_ROUTE} from "../../Routes/consts";
const BurgerMenu = () => {
    return (
        <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox"/>
            <label className="menu__btn" htmlFor="menu__toggle">
                <span></span>
            </label>

            <ul className="menu__box">
                <li><NavLink className="menu__item" to={CINEMA_ROUTE + FILM_SELECTION_ROUTE}>Films</NavLink></li>
                <li><a className="menu__item" href="#">Serial</a></li>
                <li><a className="menu__item" href="#">Cartoon</a></li>
            </ul>
        </div>
    );
};

export default BurgerMenu;
