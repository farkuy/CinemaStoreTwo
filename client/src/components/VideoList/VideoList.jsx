import React from 'react';
import {Card, CardContent, Typography, CardMedia} from "@mui/material";

const VideoList = () => {
    return (
        <div>
            <Card
                onClick={(e) =>  window.location.href = `https://widgets.kinopoisk.ru/discovery/trailer/12799?onlyPlayer=0&autoplay=1&cover=1`}
                component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
                <CardContent>

                    <Typography
                        level="h6"
                        fontWeight="lg"
                        textColor="#fff"
                        mt={{ xs: 12, sm: 18 }}
                    >
                        Video
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default VideoList;