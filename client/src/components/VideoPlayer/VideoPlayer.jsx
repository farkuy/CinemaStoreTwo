import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Button, IconButton, Slider} from "@mui/material";
import Box from "@mui/material/Box";
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import './VideoPlayerStyle.css'
import ReactPlayer from "react-player";
import axios from "axios";
import {convertISO8601ToSeconds, convertToSeconds, timeCodeColorAssignment} from "../../utils/function";
import {youTubeApiKey} from "../../utils/constsForApi";
import {checkComment, checkVideo} from "../../http/userApi";
import {useSelector} from "react-redux";
import {Context} from "../../index";
import ConsecutiveSnackbars from "../ConsecutiveSnackbars/ConsecutiveSnackbars";

const VideoPlayer = ({trueId, url}) => {
    const {user} = useContext(Context);
    const timeCode = useSelector((state) => state.timeCode.value);
    const newTimeCode = useSelector((state) => state.timeCode.counter);
    const [volume, setVolume] = useState(0.5);
    const [playSeconds, setPlaySeconds] = useState(0);
    const [videoLength, setVideoLength] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [showVolume, setShowVolume] = useState(`none`);
    const [showWidget, setShowWidget] = useState('block');
    const [commentForTimeCode, setCommentForTimeCode] = useState([]);
    const [marks, setMarks] = useState([]);
    const [position, setPosition] = useState({x: 0, y: 0, value: 0})
    const ref = useRef();
    const full = useRef();
    const testMarks = new Map()

    const handleChangVolume = (event, newValue) => {
        setVolume(newValue);
    };
    const handleChangTimer = (event, newValue) => {
        const mark = marks.find((mark) => mark.value === newValue);
        if (mark)
        {
           setCommentForTimeCode(mark.comments);
        }
        ref.current.seekTo(newValue)
        setPlaySeconds(newValue);
        setPlaying(true)
    };

    const clickForGetCommentTimeCode = (event) => {
        const mark = marks.find((mark) => mark.value === playSeconds)
        if (mark)
        {
            setPosition({x: event.pageX, y: event.pageY, value: playSeconds})
        }
    };

    const prog = (e) => {
        setPlaySeconds(e.playedSeconds)
    }

    const fullScreen = (e) => {
        ref.current.wrapper.requestFullscreen();
    }

    useEffect(() => {
        let arr = timeCode.split(':');
        arr = arr.map((time) => {
            if (time.length === 1) {
                return `0${time}`
            } return time
        })
        let rewind = convertToSeconds(arr)
        if (rewind >= videoLength)
        {
            ref.current.seekTo(videoLength)
            return;
        }
        if (rewind < 0)
        {
            ref.current.seekTo(0)
            return
        }
        ref.current.seekTo(rewind)
        setPlaying(true)
    }, [newTimeCode])

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

    useMemo(() => {
        if (user.isAuth)
        {
            const userId = user.user.id;
            checkComment(userId, url)
                .then(data => {
                    let timeCodes = data.filter((comment) => {
                        if (comment.timecodeList.length > 0) return true
                    })
                    timeCodes.forEach((timeCode) => {
                        let timeCodeList = timeCode.timecodeList

                        timeCodeList = new Set(timeCodeList)
                        timeCode.timecodeList = Array.from(timeCodeList)

                        for (let code of timeCode.timecodeList)
                        {
                            !testMarks.has(code)
                            ? testMarks.set(code, [timeCode])
                            : testMarks.set(code, [...testMarks.get(code), timeCode])
                        }

                    })
                    timeCodes = Array.from(testMarks).map((timeCode) => {
                        const arrTimeCode = timeCode[0].split(':');
                        let seconds = arrTimeCode.map((time) => {
                            if (time.length === 1) {
                                return `0${time}`
                            }
                            return time
                        })
                        seconds = convertToSeconds(seconds)

                        if (seconds >= videoLength)
                        {
                            seconds = videoLength
                        }
                        if (seconds < 0)
                        {
                            seconds = 0
                        }
                        return {
                            value: seconds,
                            comments: timeCode[1],
                        }
                    })
                    timeCodes.sort((a, b) => a.value - b.value)
                    setMarks(timeCodes)
                })
        }
    }, [videoLength])

    useMemo(() => {
        if (marks.length > 0)
        {
            const element = document.querySelectorAll(`.MuiSlider-mark`);
            for (let i = 0; i < element.length; ++i)
            {
                const color = timeCodeColorAssignment(marks[i].comments.length)
                element[i].style.color = color
                element[i].addEventListener('mouseover', () => {
                    element[i].style.color = '#4B5ED7';
                });
                element[i].addEventListener('mouseout', () => {
                    element[i].style.color = color;
                });
            }
        }

    }, [marks])


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
            <ConsecutiveSnackbars commentForTimeCode={commentForTimeCode} positionMessage={position}/>
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
                                '& .MuiSlider-mark': {
                                    height: '20px',
                                    width: '0.3%'
                                }
                            }}
                            step={1}
                            min={0}
                            max={videoLength}
                            value={playSeconds}
                            defaultValue={volume}
                            aria-label="Temperature"
                            valueLabelDisplay="auto"
                            marks={marks}
                            onClick={clickForGetCommentTimeCode}
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