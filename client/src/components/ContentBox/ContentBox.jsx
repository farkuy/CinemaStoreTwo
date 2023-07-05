import React, {useEffect, useState} from 'react';
import {convertToObjectFromAPISource} from "../../utils/functionForApi";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import './ContentBoxStyle.css';
import {useNavigate} from "react-router-dom";
import {CONTENT_ROUTE} from "../../Routes/consts";
import {addContentBasket} from "../../http/basketApi";
const ContentBox = ({info}) => {
    const [genres, setGenres] = useState('');
    const infoStandard = convertToObjectFromAPISource(info);
    const history = useNavigate();

    useEffect( () => {
        let g = ``;
        for (let i of infoStandard.genres) {
            g += i.genre + ` `
        };
        setGenres(g);
    }, []);

    const getMoviePage = (e) => {
        e.preventDefault();
        history(`${CONTENT_ROUTE}/:${info.filmId}`);
    };

    const addContentToBasket = async (e) => {
        e.stopPropagation();

        const userId = localStorage.getItem('userId')
        await addContentBasket(Number(userId), info.filmId, info)
            .then(data => {
                console.log(data)
            })
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
                            <Button
                                size="small"
                                color="primary"
                                onClick={addContentToBasket}
                            >
                                Добавить в закладки
                            </Button>
                        </CardActions>
                    </Card>
            }
        </div>
    );
};

export default ContentBox;