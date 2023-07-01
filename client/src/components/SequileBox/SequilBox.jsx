import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {CONTENT_ROUTE} from "../../Routes/consts";
import {useNavigate} from "react-router-dom";

const SequilBox = ({content}) => {

    const history = useNavigate();

    const getMoviePage = (e) => {
        e.preventDefault();
        window.scroll(0, 0)
        history(`${CONTENT_ROUTE}/:${content.filmId}`)
    }

    return (
        <Card
            onClick={getMoviePage}
            className={`movie`}
        >
            <CardActionArea>
                <CardMedia
                    className={'imageContent'}
                    component="img"
                    image={`${content.posterUrl}`}
                    alt="green iguana"
                />
                <CardContent className={`movie__info`}>
                    <Typography className={`movie__title`} gutterBottom variant="h6" component="div">
                        {content.nameRu}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={`movie__btn`}>
                <Button size="small" color="primary">
                    Добавить в закладки
                </Button>
            </CardActions>
        </Card>
    );
};

export default SequilBox;