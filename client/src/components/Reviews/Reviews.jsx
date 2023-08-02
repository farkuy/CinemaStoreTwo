import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Card, CardContent, List, Paper, Typography} from "@mui/material";
import {deleteUserReview, showAllFilmReviews} from "../../http/userApi";
import {Context} from "../../index";
import SnackbarMessage from "../SnackbarMessages/SnackbarMessage";

const Reviews = ({reviewsList, page, upPage, filmInfo, setUpdateReviewList, reloadReviewList, updateReviewList}) => {
    const {user} = useContext(Context);
    const [list, setList] = useState(reviewsList);
    const heightList = useRef();
    const [isAdmin, setIsAdmin] = useState('');
    const [openWindow, setOpenWindow] = useState(false);
    const [infoAboutDeleteReview, setInfoAboutDeleteReview] = useState('')


    useEffect(() => {
        setIsAdmin(user.user.role)

        if (user && filmInfo.kinopoiskId) {
            const userId = user.user.id;
            showAllFilmReviews(userId, filmInfo.kinopoiskId)
                .then(data => {
                    console.log(data)
                    const stndart = data.map((author) => {
                        return {
                            type: author.appraisal,
                            author: author.userName,
                            title: author.h1 || '',
                            date: author.updatedAt,
                            description: author.text,
                            serverInfo: true,
                            userId: author.userId,
                            filmId: author.filmId
                        }
                    })
                    setList([...stndart, ...reviewsList])
                })
        } else {
            setList(reviewsList)
        }
    }, [reviewsList])
    const close = (x) => {
        setOpenWindow(false)
    }

    return (
        <div>
            <Paper style={{maxHeight: 500, overflow: 'auto', padding: '0 5% 0 5%'}}>
                <List ref={heightList}>
                    {
                        list.map((i, index) => {
                            let backGrad = '';
                            if (i.type === "NEGATIVE") {
                                backGrad = 'linear-gradient(-45deg, #e52d27, #b31217)'
                            }
                            if (i.type === "POSITIVE") {
                                backGrad = 'linear-gradient(-45deg, #1d976c, #93f9b9)'
                            }
                            if (i.type === "NEUTRAL") {
                                backGrad = 'linear-gradient(-45deg, #2c3e50, #bdc3c7)'
                            }
                            const timeCorrect = i.date.split('T').join(' ');
                            const userId = i.userId

                            return <Card
                                style={{background: `${backGrad}`, margin: '10px'}}
                                sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {i.author}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {i.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {timeCorrect}
                                    </Typography>
                                    <Typography variant="body2">
                                        {i.description}
                                    </Typography>
                                </CardContent>
                                {
                                    isAdmin === 'ADMIN' && i.serverInfo === true || i.userId === user.user.id
                                    ? <Button
                                            style={{padding: `7px, 0, 5px, 7px`}}
                                            size="md"
                                            variant="solid"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                const delRew = await deleteUserReview(userId, i.filmId)
                                                setInfoAboutDeleteReview(delRew);
                                                reloadReviewList();
                                            }}
                                        >
                                            Удалить рецензию
                                        </Button>
                                    : <div> </div>
                                }
                            </Card>
                        })
                    }
                    <Button
                        style={{marginLeft: `7px`}}
                        size="md"
                        variant="solid"
                        color="neutral"
                        onClick={() => upPage(page + 1)}
                    >
                        Показать другие рецензии...
                    </Button>
                </List>
            </Paper>
            <SnackbarMessage setOpenWindow={setOpenWindow} close={close} info={infoAboutDeleteReview} openWindow={openWindow}/>
        </div>
    );
};

export default Reviews;