import React, {useEffect, useState} from 'react';
import './ContentPageStyle.css'
import {useParams} from "react-router-dom";
import {getMovieById, getRelatedMovies, getReviews} from "../../http/kinopoiskApi";
import {еimerEqualizer} from "../../utils/function";
import SequilBox from "../SequileBox/SequilBox";
import ImgSlider from "../ImgSlider/ImgSlider";
import Reviews from "../Reviews/Reviews";
import {Button, Modal, Typography} from "@mui/material";
import VideoList from "../VideoList/VideoList";
import MaineInfo from "./MaineInfo";
import Box from "@mui/material/Box";
import UserReview from "../UserReviews/UserReview";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ContentPage = () => {

    const {id} = useParams();
    const [filmInfo, setFilmInfo] = useState({});
    const [sequelPrequelList, setSequelPrequelList] = useState([]);
    const [finishSequelPrequelList, setFinishSequelPrequelList] = useState([])
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [reviewsList, setReviews] = useState([]);
    const [reviewsInfo, setReviewsInfo] = useState({});
    const [pageReviews, setPageReviews] = useState(1);


    useEffect(  () => {
         getMovieById.getFilmInfo(id)
            .then(data => {
                setFilmInfo(data);
            })
    }, [id])

    useEffect(() => {
        if(filmInfo.kinopoiskId) {
            getMovieById.getSequelPrequel(filmInfo.kinopoiskId)
                .then(data => {
                    if (data.length > 3) {
                        setFinishSequelPrequelList([...data].slice(0, 3))
                    } else {
                        setFinishSequelPrequelList(data)
                    }
                    setSequelPrequelList(data);
                })
            getRelatedMovies.getRelatedMovies(filmInfo.kinopoiskId)
                .then(data => {
                    console.log(data);
                    setRelatedMovies(data.items)
                })
        }

    }, [filmInfo])

    useEffect(() => {
        if(filmInfo.kinopoiskId) {
            getReviews.getReviews(filmInfo.kinopoiskId, pageReviews)
                .then(data => {
                    setReviewsInfo(data)
                    if (data.items.length !== 0) {
                        setReviews([...reviewsList, ...data.items])
                    }
                })
        }

    }, [filmInfo, pageReviews])

    const upPage = (x) => {
        setPageReviews(x)
    }

    return (
        <div>
            <MaineInfo filmInfo={filmInfo}/>

            <div className={'listSeq'}>
                {
                    finishSequelPrequelList && finishSequelPrequelList.map((content, index) => {
                        return <SequilBox className={'centerBox'} key={content.filmId} content={content}/>
                    })
                }

            </div>
            {
                sequelPrequelList.length > 3 && finishSequelPrequelList.length <= 3
                ? <Button
                        size="md"
                        variant="solid"
                        color="neutral"
                        onClick={() => setFinishSequelPrequelList(sequelPrequelList)}
                    >
                        Показать все...
                    </Button>
                : <div></div>
            }

            <ImgSlider relatedMovies={relatedMovies}/>

            <Reviews upPage={upPage} page={pageReviews} reviewsList={reviewsList}/>
            <UserReview filmInfo={filmInfo}/>

            <VideoList/>
        </div>
    );
};

export default ContentPage;