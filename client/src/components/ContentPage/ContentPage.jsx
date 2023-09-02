import React, {useContext, useEffect, useState} from 'react';
import './ContentPageStyle.css'
import {json, useParams} from "react-router-dom";
import {getMovieById, getRelatedMovies, getReviews} from "../../http/kinopoiskApi";
import SequilBox from "../SequileBox/SequilBox";
import ImgSlider from "../ImgSlider/ImgSlider";
import Reviews from "../Reviews/Reviews";
import {Button} from "@mui/material";
import VideoList from "../VideoList/VideoList";
import MaineInfo from "./MaineInfo";
import UserReview from "../UserReviews/UserReview";
import {Context} from "../../index";

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
    const {user} = useContext(Context);
    const {id} = useParams();
    const [filmInfo, setFilmInfo] = useState({});
    const [sequelPrequelList, setSequelPrequelList] = useState([]);
    const [finishSequelPrequelList, setFinishSequelPrequelList] = useState([])
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [reviewsList, setReviews] = useState([]);
    const [reviewsInfo, setReviewsInfo] = useState({});
    const [pageReviews, setPageReviews] = useState(1);
    const [updateReviewList, setUpdateReviewList] = useState(0)


    useEffect(  () => {
         getMovieById.getFilmInfo(id)
            .then(data => {
                setFilmInfo(data);
            })


        let idTrue = Number (id.split('').filter(str => str !== ':').join(''));
         let list = JSON.parse(localStorage.getItem('visitList'))
        if (!list)
        {
            let newArr = [];
            newArr.push(idTrue)
            newArr = JSON.stringify(newArr)
            localStorage.setItem('visitList', newArr)
            return
        }
        if (list.length >= 6)
        {
            list.pop()
        }

        let index = list.indexOf(idTrue)
        if (index !== -1)
        {
            list.splice(index, 1)
        }
        list.unshift(idTrue)
        list = JSON.stringify(list)
        localStorage.setItem('visitList', list)
    }, [id])

    useEffect(() => {
        let idTrue = filmInfo.kinopoiskId
        if(idTrue) {
            getMovieById.getSequelPrequel(idTrue)
                .then(data => {
                    if (data.length > 3) {
                        setFinishSequelPrequelList([...data].slice(0, 3))
                    } else {
                        setFinishSequelPrequelList(data)
                    }
                    setSequelPrequelList(data);
                })
            getRelatedMovies.getRelatedMovies(idTrue)
                .then(data => {
                    setRelatedMovies(data.items)
                })
        }

    }, [filmInfo])

    useEffect(() => {
        if(filmInfo.kinopoiskId) {
            getReviews.getReviews(filmInfo.kinopoiskId, pageReviews)
                .then(data => {
                    setReviewsInfo(data)
                    if (data.items.length !== 0 && pageReviews !== 1) {
                        setReviews([...reviewsList, ...data.items])
                    } else if (data.items.length !== 0 && pageReviews === 1) {
                        setReviews([...data.items])
                    }
                })
        }

    }, [filmInfo, pageReviews, updateReviewList])


    const upPage = (x) => {
        setPageReviews(x)
    }

    const reloadReviewList = () => {
        setUpdateReviewList(updateReviewList + 1)
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
                ? <div style={{display: `flex`, justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                        <Button
                            size="md"
                            variant="solid"
                            color="neutral"
                            onClick={() => setFinishSequelPrequelList(sequelPrequelList)}
                        >
                            Показать все...
                        </Button>
                    </div>

                : <div></div>
            }

            <ImgSlider style={{marginTop: '20px'}} setPageReviews={setPageReviews} relatedMovies={relatedMovies}/>

            <Reviews reloadReviewList={reloadReviewList} setUpdateReviewList={setUpdateReviewList} updateReviewList={updateReviewList} filmInfo={filmInfo} upPage={upPage} page={pageReviews} reviewsList={reviewsList}/>

            {
                user.isAuth
                ? <div style={{display: `flex`, justifyContent: 'center', alignItems: 'center'}}>
                        <UserReview reloadReviewList={reloadReviewList} setUpdateReviewList={setUpdateReviewList} updateReviewList={updateReviewList} filmInfo={filmInfo}/>
                    </div>
                : <div></div>
            }

            <VideoList id={id}/>
        </div>
    );
};

export default ContentPage;