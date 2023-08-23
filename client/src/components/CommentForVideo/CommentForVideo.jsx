import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Divider, Grid, Paper} from "@mui/material";
import {checkComment} from "../../http/userApi";
import {Context} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {setValue} from "../../toolkitRedux/timeCodeReducer";
import './CommentForVideoStyle.css'

const CommentForVideo = ({url}) => {
    const dispatch = useDispatch();
    const timeCodeRedux = useSelector((state) => state.timeCode.value);
    const {user} = useContext(Context);
    const [comment, setComment] = useState([])

    const timeCode = (event) => {
        return (
            <div
                style={{ color: '#0080ff', display: 'inline', cursor: `pointer`, }}
                onClick={() => dispatch(setValue(event))}
            >
                {`${event} `}
            </div>
        );
    }

    const justText = (txt) => {
        return (
            <div style={{display: 'inline'}}>{`${txt}`}</div>
        )
    }

    const box = (args) => {
        return (
            <div style={{display: 'inline'}}>
                { args.map((arg) => {
                    return arg
                })
                }
            </div>
        )
    }

    useEffect(() => {
        if (user.isAuth)
        {
            const userId = user.user.id;
            checkComment(userId, url)
                .then(data => {
                    setComment(data)
                })
        }
    }, [])

    return (
        <div className={'comment'}>
            <Paper style={{ padding: "40px 20px" }}>
                {
                    comment.map((commentInfo) => {
                        const mapText = []
                        let timeCorrect = commentInfo.date.split('T').join(' ');
                        const date = new Date(timeCorrect);
                        const formattedDate = date.toISOString().replace("T", " ").replace(/\.\d{3}Z/, "");
                        const allText = commentInfo.text;
                        let startIndex = 0;
                        for (let miniText of commentInfo.timecodeList)
                        {
                            let index = allText.indexOf(miniText)
                            if (index !== -1)
                            {
                                let txt = allText.slice(startIndex, index);
                                const regex = /\d{1,2}:\d{1,2}(:\d{1,2})?/g;
                                let newText = txt.replace(regex, '');
                                newText = justText(newText)
                                let span = timeCode(miniText)
                                startIndex = allText.indexOf(miniText) + miniText.length
                                mapText.push(newText,span)
                            }
                        }

                        let txt = allText.slice(startIndex, startIndex);
                        const regex = /\d{1,2}:\d{1,2}(:\d{1,2})?/g;
                        let end = txt.replace(regex, '');
                        end = justText(end)
                        mapText.push(end)

                        return <div>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt={`${commentInfo.avatar}` || "Remy Sharp"}/>
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left" }}>{commentInfo.userName}</h4>
                                    <p style={{ textAlign: "left" }}>
                                        {box(mapText)}
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                        posted {formattedDate}
                                    </p>
                                </Grid>
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                        </div>
                    })
                }

            </Paper>
        </div>
    );
};

export default CommentForVideo;