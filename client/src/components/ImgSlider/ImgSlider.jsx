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

const ImgSlider = ({ relatedMovies }) => {
    const [infoArr, setInfoArr] = useState([]);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        let related = relatedMovies.map((movie) => {
            return {
                label: movie.nameRu,
                imgPath: movie.posterUrl,
            };
        });
        setInfoArr(related);
    }, [relatedMovies]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={'maineCenter'}>
            {
                infoArr.length > 0
                    ?  <Box sx={{ width: '80%', bgcolor: 'background.paper' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            {infoArr.map((inf, index) => (
                                <div>
                                    <Card className={`imgCard`}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={"imageContent"}
                                                component="img"
                                                image={`${inf.imgPath}`}
                                                alt="green iguana"
                                            />
                                        </CardActionArea>
                                    </Card>
                                    <Tab key={index} label={inf.label}>
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