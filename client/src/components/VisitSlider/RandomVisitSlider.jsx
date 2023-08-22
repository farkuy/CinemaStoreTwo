import React, {useEffect, useState} from 'react';
import {CONTENT_ROUTE} from "../../Routes/consts";
import {Card, CardActionArea, CardMedia} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getMovieById} from "../../http/kinopoiskApi";

const RandomVisitSlider = () => {
    const [conentInfo, setContentInfo] = useState({});
    const history = useNavigate();

    useEffect(() => {
        let randomId = Math.ceil(Math.random() * 1000) ;
        async function getInfo(id) {
            try
            {
                const maine = await getMovieById.getFilmInfo(id)
                setContentInfo(maine)
            }
            catch (e)
            {
                randomId = Math.ceil(Math.random() * 1000);
                getInfo(randomId)
            }
        }
        getInfo(randomId)
    }, [])

    return (
        <div>
            <Card className={`getVisit`}
                  onClick={() => history(`${CONTENT_ROUTE}/:${conentInfo.kinopoiskId}`)}
            >
                <CardActionArea>
                    <CardMedia
                        className={"imageContent"}
                        component="img"
                        image={`${conentInfo.posterUrlPreview}`}
                        alt="green iguana"
                    />
                </CardActionArea>
            </Card>
        </div>
    );
};

export default RandomVisitSlider;