import React, {useEffect, useState} from 'react';
import {convertToObjectFromAPISource} from "../../utils/functionForApi";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import './ContentBoxStyle.css'
import {useNavigate} from "react-router-dom";
import {CONTENT_ROUTE} from "../../Routes/consts";
const ContentBox = ({info}) => {
    const [genres, setGenres] = useState('');
    const infoStandard = convertToObjectFromAPISource(info);
    const history = useNavigate();

    useEffect( () => {
        console.log(infoStandard)
        let g = ``;
        for (let i of infoStandard.genres) {
            g += i.genre + ` `
        }
        setGenres(g)
    }, []);

    const getMoviePage = (e) => {
        e.preventDefault();
        history(`${CONTENT_ROUTE}/:${info.filmId}`)
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
                            <Button size="small" color="primary">
                                Добавить в закладки
                            </Button>
                        </CardActions>
                    </Card>
            }
        </div>
    );
};

export default ContentBox;