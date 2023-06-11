import React, {useEffect, useState} from 'react';
import {convertToObjectFromAPISource} from "../../utils/functionForApi";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import './ContentBoxStyle.css'
const ContentBox = ({info}) => {
    const [genres, setGenres] = useState('');
    const infoStandard = convertToObjectFromAPISource(info);

    useEffect(() => {
        let g = ``;
        for (let i of infoStandard.genres) {
            g += i.genre + ` `
        }
        setGenres(g)
    }, [])

    return (
        <div>
            {
                Object.keys(info).length === 0
                    ? <div className={`ContentCard`}>da</div>
                    :  /*<div className={`movie`}>
                        <div className="movie__cover-inner">
                            <img className={'imageContent'} src={infoStandard.posterUrl} alt=""/>
                        </div>
                        <div className={`movie__info`}>
                            <div className={`movie__title`}>{infoStandard.nameRu}</div>
                            {infoStandard.year}
                            <div className={`movie__category`}>{genres}</div>
                            {/!*<div className={`movie__average movie__average--${
                                getClassByRate(infoStandard.ratingKinopoisk)
                            }`}>{infoStandard.ratingKinopoisk}</div>*!/}
                        </div>

                    </div>*/
                    <Card className={`movie`}>
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