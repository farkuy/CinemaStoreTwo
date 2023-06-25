import React, {useEffect, useState} from 'react';
import './ContentPageStyle.css'
import {useParams} from "react-router-dom";
import './ContentPageStyle.css'
import {getMovieById} from "../../http/kinopoiskApi";
const ContentPage = () => {

    const {id} = useParams();
    const [filmInfo, setFilmInfo] = useState({});

    useEffect(() => {
        getMovieById.getFilmInfo(id)
            .then(data => {
                setFilmInfo(data)
            })
    }, [])

    return (
        <div className="wrapper">

            <div className="wrapper-col-1">
                <img src={filmInfo.posterUrl} alt="Логан (2017)"/>
            </div>

            <div className="wrapper-col-2">
                <h1 className="title">{filmInfo.nameRu}</h1>
                <h6 className="subtitle">{filmInfo.nameOriginal}</h6>
                <p className="description">{filmInfo.shortDescription}.</p>

                <div className="mb-40">
                    <a href="#" className="btn">Смотреть</a>
                </div>

                <ul className="params mb-40">
                    <li><span className="text-muted">Аудиодорожки</span> Русский, Русский 5.1, Английский, Английский
                        5.1
                    </li>
                    <li><span className="text-muted">Субтитры</span> Русские, Английские</li>
                    <li><span className="text-muted">Качество видео</span> <span><span
                        className="tag">Full HD</span></span></li>
                </ul>

                <h2>О фильме</h2>

                <ul className="params">
                    <li><span className="text-muted">Год производства</span> {filmInfo.year}</li>
                    <li><span className="text-muted">Страна</span> США</li>
                    <li><span className="text-muted">Жанр</span> <span><a href="#">фантастика</a>, <a
                        href="#">боевик</a>, <a href="#">триллер</a>, <a href="#">драма</a></span></li>
                    <li><span className="text-muted">Слоган</span> <span
                        className="text-muted">«Его время пришло»</span></li>
                    <li><span className="text-muted">Режиссер</span> Джеймс Мэнголд</li>
                    <li><span className="text-muted">Время</span>
                        <time className="text-muted">137 мин. / 02:17</time>
                    </li>
                </ul>
            </div>

            <div className="wrapper-col-3">
                <span className="rathing-main">{filmInfo.ratingKinopoisk}</span>
                <span className="rathing-counts">296 824 оценки</span>
                <a href="#" className="rathing-details">459 рецензий</a>
            </div>

            <div className="wrapper-col-3">

            </div>

        </div>
    );
};

export default ContentPage;