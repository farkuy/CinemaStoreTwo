import React, {useEffect, useState} from 'react';
import './ContentPageStyle.css'
import {useParams} from "react-router-dom";
import {getMovieById} from "../../http/kinopoiskApi";
import {еimerEqualizer} from "../../utils/function";
import SequilBox from "../SequileBox/SequilBox";
const ContentPage = () => {

    const {id} = useParams();
    const [filmInfo, setFilmInfo] = useState({});
    const [sequelPrequelList, setSequelPrequelList] = useState([])

    useEffect(  () => {
         getMovieById.getFilmInfo(id)
            .then(data => {
                setFilmInfo(data)
                console.log(data)
            })
    }, [id])

    useEffect(() => {
        if(filmInfo.kinopoiskId) {
            getMovieById.getSequelPrequel(filmInfo.kinopoiskId)
                .then(data => {
                    setSequelPrequelList(data);
                    console.log(data)
                })
        }

    }, [filmInfo])

    return (
        <div>
            <div className="wrapper">

                <div className="wrapper-col-1">
                    <img src={filmInfo.posterUrl} alt={filmInfo.nameRu}/>
                </div>

                <div className="wrapper-col-2">
                    <h1 className="title">{filmInfo.nameRu}</h1>
                    <h6 className="subtitle">{filmInfo.nameOriginal}</h6>
                    <p className="description">{filmInfo.shortDescription}.</p>

                    <div className="mb-40">
                        <a href="#" className="btn">Добавить</a>
                    </div>

                    <h2>О фильме</h2>

                    <ul className="params">
                        <li><span className="text-muted">Год производства</span> {filmInfo.year}</li>
                        <li>
                            <span className="text-muted">Страна</span>
                            {filmInfo.countries && filmInfo.countries.map((c) => <div key={c}>{c.country}</div>)}
                        </li>
                        <li>
                            <span className="text-muted">Жанр</span>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {filmInfo.genres && filmInfo.genres.map((c, index) => <div style={{marginRight: 5}} key={index}>{c.genre}</div>)}
                            </div>

                        </li>
                        <li><span className="text-muted">Слоган</span><span
                            className="text-muted">{filmInfo.slogan}</span></li>
                        <li><span className="text-muted">Режиссер</span> Джеймс Мэнголд</li>
                        <li><span className="text-muted">Время</span>
                            <time className="text-muted">{еimerEqualizer(filmInfo.filmLength)}</time>
                        </li>
                    </ul>
                </div>

                <div className="wrapper-col-3">
                    <span className="rathing-main">{filmInfo.ratingKinopoisk}</span>
                    <span className="rathing-counts">{filmInfo.ratingKinopoiskVoteCount} оценки</span>
                    <a href="#" className="rathing-details">459 рецензий</a>
                </div>


            </div>

            <h2 style={{paddingLeft: 10}}>Сиквелы, прикветы, ремейки</h2>
            <div className={'listSeq'}>
                {
                    sequelPrequelList && sequelPrequelList.map((content, index) => {
                        return <SequilBox className={'centerBox'} key={content.filmId} content={content}/>
                    })
                }
            </div>
        </div>

    );
};

export default ContentPage;