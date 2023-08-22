import React, {useEffect, useState} from 'react';
import {Card, CardActionArea, CardMedia, Tab} from "@mui/material";
import {getMovieById} from "../../http/kinopoiskApi";
import './VisitSlideStyle.css'
import {useNavigate} from "react-router-dom";
import {CONTENT_ROUTE} from "../../Routes/consts";

const VisitSlider = ({info, index}) => {
    const [conentInfo, setContentInfo] = useState({});
    const history = useNavigate();

    useEffect(() => {
        async function getInfo() {
            const maine = await getMovieById.getFilmInfo(info)
            setContentInfo(maine)
        }
        getInfo()
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

export default VisitSlider;