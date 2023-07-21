import React, {useEffect, useState} from 'react';
import {convertToObjectFromAPISource} from "../../utils/functionForApi";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import './ContentBoxStyle.css';
import {useNavigate} from "react-router-dom";
import {CONTENT_ROUTE} from "../../Routes/consts";
import {addContentBasket, deleteContentBasket} from "../../http/basketApi";
import {StandardContentInfoAboutKinopoiskId, standardContentInfoAboutKinopoiskId} from "../../utils/class";
const ContentBox = ({info, removeContent}) => {
    const [genres, setGenres] = useState('');
    const infoStandard = convertToObjectFromAPISource(info);
    const [location, setLocation] = useState('standart')
    const history = useNavigate();

    useEffect( () => {
        let g = ``;
        if(infoStandard.genres) {
            for (let i of infoStandard.genres) {
                g += i.genre + ` `
            };
            setGenres(g);
        } else {
            setGenres('')
        }

        const handlePopstate = () => {
            const url = window.location.href;
            const parts = url.split('/');
            const lastPart = parts[parts.length - 1];
            setLocation(lastPart)
        }

        window.addEventListener('popstate', handlePopstate)

        handlePopstate();

        return () => {
            window.removeEventListener('popstate', handlePopstate)
        }
    }, []);

    const getMoviePage = (e) => {
        e.preventDefault();
        history(`${CONTENT_ROUTE}/:${infoStandard.kinopoiskId}`);
    };

    const addContentToBasket = async (e) => {
        e.stopPropagation();

        console.log(info)
        const userId = localStorage.getItem('userId')
        if (info.filmId) {
            await addContentBasket(Number(userId), info.filmId, info)
                .then(data => {
                    console.log(data)
                })
        } if(info.kinopoiskId) {
            const inf = new StandardContentInfoAboutKinopoiskId(info);
            console.log(inf)
            await addContentBasket(Number(userId), inf.filmId, inf)
                .then(data => {
                    console.log(data)
                })
        }

    }

    const deleteContent = async (e) => {
        e.stopPropagation();

        const basketContentId = infoStandard.kinopoiskId;
        const userId = localStorage.getItem('userId')
        await deleteContentBasket(Number(basketContentId), Number(userId))
            .then(data => {
                console.log(data)
            })
        removeContent(basketContentId)
    }

    return (
        <div>
            {
                Object.keys(info).length === 0
                    ? <div className={`ContentCard`}></div>
                    :
                    <Card
                        onClick={getMoviePage}
                        className={`movie`}
                    >
                        <CardActionArea>
                            <CardMedia
                                className={'imageContent'}
                                component="img"
                                image={`${infoStandard.posterUrl}`}
                                alt="green iguana"
                            />
                            <CardContent className={`movie__info`}>
                                <Typography className={`movie__title`} gutterBottom variant="h6" component="div">
                                    {infoStandard.nameRu}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {genres}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={`movie__btn`}>
                            {
                                location !== 'basket'
                                ? <Button
                                        size="small"
                                        color="primary"
                                        onClick={addContentToBasket}
                                    >
                                        Добавить в закладки
                                    </Button>
                                :   <Button
                                        size="small"
                                        color="error"
                                        onClick={deleteContent}
                                    >
                                        Удалить из закладок
                                    </Button>
                            }

                        </CardActions>
                    </Card>
            }
        </div>
    );
};

export default ContentBox;