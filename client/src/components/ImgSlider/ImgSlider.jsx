import React, {useEffect, useState} from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Tab, Tabs,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import './ImgSliderStyle.css'
import {useNavigate} from "react-router-dom";
import {CONTENT_ROUTE} from "../../Routes/consts";

const ImgSlider = ({ relatedMovies, setPageReviews }) => {
    const [infoArr, setInfoArr] = useState([]);
    const [value, setValue] = React.useState(0);
    const history = useNavigate();

    useEffect(() => {
        let related = relatedMovies.map((movie) => {
            return {
                label: movie.nameRu,
                imgPath: movie.posterUrl,
                filmId: movie.filmId,
            };
        });
        setInfoArr(related);
    }, [relatedMovies]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const relatedMoviesNavigate = (e, content) => {
        e.preventDefault();
        window.scroll(0, 0)
        setPageReviews(1)
        history(`${CONTENT_ROUTE}/:${content.filmId}`)
    }

    return (
        <div className={'maineCenter'}>
            {
                infoArr.length > 0
                    ?  <Box sx={{ width: '79%', bgcolor: 'background.paper' }}>
                            <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            {infoArr.map((inf, index) => (
                                <div
                                >
                                    <Card className={`imgCard`}
                                          onClick={(e) => relatedMoviesNavigate(e, inf)}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                className={"imageContent"}
                                                component="img"
                                                image={`${inf.imgPath}`}
                                                alt="green iguana"
                                            />
                                        </CardActionArea>
                                    </Card>
                                    <Tab
                                        key={index} label={inf.label}>
                                    </Tab>
                                </div>
                            ))}
                        </Tabs>
                    </Box>
                    : <div></div>
            }
        </div>
    );
};

export default ImgSlider;