import React, {useEffect, useMemo, useState} from 'react';
import '../VideoPlayer/VideoPlayerStyle.css'
import {miscellaneousInformation} from "../../http/kinopoiskApi";
import {youTubeApiKey} from "../../utils/constsForApi";
import {Button, Card, CardContent, CardMedia, Tab, Tabs, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import '../ImgSlider/ImgSliderStyle.css'
import ModalVideo from "../ModalVideo/ModalVideo";


const VideoList = ({id}) => {
    const [trueId, setTrueId] = useState(-1);
    const [videoList, setVideoList] = useState([]);
    const [value, setValue] = useState(0)

    useEffect(() => {
        const mId = Number(id.split(':')[1]);
        setTrueId(mId)
        miscellaneousInformation.getVideo(mId)
            .then(data => {
                let newArr = data.items.filter((film) => {
                    if (film.site === 'YOUTUBE') {
                        return true
                    }
                })
                setVideoList(newArr)
            })
    }, [id])

    useMemo(() => {
        console.log(videoList)
        videoList.forEach((film, index) => {
            let videoId = film.url.split('/')
            videoId = videoId[videoId.length - 1]
            fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${youTubeApiKey}`)
                .then(response => response.json())
                .then(data => {
                    const thumbnailUrl = data.items[0].snippet.thumbnails.medium.url;
                    film.img = thumbnailUrl;
                })
                .catch(error => {
                    film.img = 'https://png.pngtree.com/png-vector/20190420/ourlarge/pngtree-question-mark-vector-icon-png-image_963326.jpg'
                });
        })
    }, [videoList, id])

    return (
        <div className={'maineCenter'}>
            {
                videoList.length > 0
                    ?  <Box sx={{ width: '79%', bgcolor: 'background.paper' }}>
                        <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            {videoList.map((video, index) => (
                                <div>
                                    <Card sx={{ width: 300 }}

                                    >
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="140"
                                            image={`${video.img}`}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h9" component="div">
                                                {video.name}
                                            </Typography>
                                            <ModalVideo trueId={trueId} url={video.url}/>
                                        </CardContent>
                                    </Card>
                                    <Tab
                                        key={index}>
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

export default VideoList;