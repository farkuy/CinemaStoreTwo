import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, IconButton, Slider} from "@mui/material";
import Box from "@mui/material/Box";
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import './VideoPlayerStyle.css'
import ReactPlayer from "react-player";
import axios from "axios";
import {convertISO8601ToSeconds} from "../../utils/function";
import {youTubeApiKey} from "../../utils/constsForApi";
import {checkVideo} from "../../http/userApi";

const VideoPlayer = ({trueId, url}) => {
    const [volume, setVolume] = useState(0.5);
    const [playSeconds, setPlaySeconds] = useState(0);
    const [videoLength, setVideoLength] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [showVolume, setShowVolume] = useState(`none`);
    const [showWidget, setShowWidget] = useState('block')
    const ref = useRef();
    const full = useRef();

    const handleChangVolume = (event, newValue) => {
        setVolume(newValue);
    };
    const handleChangTimer = (event, newValue) => {
        ref.current.seekTo(newValue)
        setPlaySeconds(newValue);
        setPlaying(true)
    };

    const prog = (e) => {
        setPlaySeconds(e.playedSeconds)
    }

    const fullScreen = (e) => {
        ref.current.wrapper.requestFullscreen();
    }

    useEffect(() => {
        const urlInfo = url.split('/')
        const videoId = urlInfo[urlInfo.length - 1]
        const apiKey = youTubeApiKey;
        axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`)
            .then(response => {
                let duration = response.data.items[0].contentDetails.duration;
                duration = convertISO8601ToSeconds(duration)
                setVideoLength(duration);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useMemo(() => {
        if (videoLength === 0) return
        checkVideo(url, videoLength)
    }, [videoLength])

    return (
        <div ref={full}>
            <ReactPlayer
                width={'100%'}
                controls={false}
                url={`${url}`}
                playing={playing}
                volume={volume}
                ref={ref}
                onProgress={prog}
            >

            </ReactPlayer>
            <div
                className={'maine'}
            >
                <div className={'video'}
                     onMouseEnter={() => setShowWidget('block')}
                     onMouseLeave={() => setShowWidget('none')}
                >
                    <div className="volume">
                        <Box
                            className={'icon'}
                        >
                            <IconButton
                                onMouseLeave = {() => setShowVolume('none')}
                                onMouseEnter = {() => setShowVolume('block')}
                            >
                                {
                                    volume > 0
                                        ? <VolumeDownIcon
                                            onClick={() => setVolume(0)}
                                            color="primary"
                                        >
                                        </VolumeDownIcon>
                                        : <VolumeOffIcon
                                            color="primary"
                                            onClick={() => setVolume(0.5)}
                                        >
                                        </VolumeOffIcon>
                                }

                            </IconButton>
                        </Box>
                        <Box
                            className={'up'}
                            sx={{ height: `120px` }}
                        >
                            <Slider
                                onMouseLeave = {() => setShowVolume('none')}
                                onMouseEnter = {() => setShowVolume('block')}
                                sx={{
                                    '& input[type="range"]': {
                                        WebkitAppearance: 'slider-vertical',
                                    },
                                }}
                                style={{display: `${showVolume}`}}
                                orientation="vertical"
                                step={0.01}
                                min={0}
                                max={1}
                                value={volume}
                                defaultValue={volume}
                                aria-label="Temperature"
                                valueLabelDisplay="auto"
                                onChange={handleChangVolume}
                            />
                        </Box>
                    </div>

                    <Box
                        className="time"
                    >
                        <Slider
                            sx={{
                                '& input[type="range"]': {
                                    WebkitAppearance: 'slider-vertical',
                                },
                            }}
                            step={1}
                            min={0}
                            max={videoLength}
                            value={playSeconds}
                            defaultValue={volume}
                            aria-label="Temperature"
                            valueLabelDisplay="auto"
                            onChange={handleChangTimer}
                        />
                    </Box>
                    <Box
                        className={'btnIc'}
                    >
                        <Button

                            variant="outlined"
                            onClick={fullScreen}
                        >
                            Full
                        </Button>
                    </Box>
                </div>
            </div>



        </div>

    );
};

export default VideoPlayer;