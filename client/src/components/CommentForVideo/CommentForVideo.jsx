import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Avatar, Button, Divider, Grid, IconButton, Paper} from "@mui/material";
import {checkComment, deleteUserComment} from "../../http/userApi";
import {Context} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import {setValue} from "../../toolkitRedux/timeCodeReducer";
import './CommentForVideoStyle.css'
import CloseIcon from "@mui/icons-material/Close";

const CommentForVideo = ({url}) => {
    const dispatch = useDispatch();
    const timeCodeCommentRedux = useSelector((state) => state.commentTimeCodeReducer.comment);
    const timeCodeCommentCheck = useSelector((state) => state.commentTimeCodeReducer.counter);
    const {user} = useContext(Context);
    const [comment, setComment] = useState([]);
    const [commentForTimeCode, setCommentForTimeCode] = useState([])

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

    useMemo(() => {
        setCommentForTimeCode(timeCodeCommentRedux)
    }, [timeCodeCommentCheck])

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

    const closeCommentFilter = () => {
        setCommentForTimeCode([])
    }

    const deleteComment = async (userName, textStr) => {
        if(user.isAuth)
        {
            const data = await deleteUserComment(userName, url, textStr)
            console.log(data)
        }
    }

    return (
        <div className={'comment'}>
            <div style={{display: 'flex', justifyContent: "flex-end"}}>
                {
                    commentForTimeCode.length !== 0
                        ?
                        <div
                        >
                            <IconButton
                                onClick={closeCommentFilter}
                                style={{position: `fixed`, right: '53px'}}
                            >
                                <CloseIcon
                                />
                            </IconButton>
                        </div>

                        : <div></div>
                }
            </div>

            <Paper style={{ padding: "40px 20px", }}>
            {
                    commentForTimeCode.length === 0
                    ? comment.map((commentInfo, index) => {
                        console.log(commentInfo)
                        const textStr = commentInfo.text
                       const userName = commentInfo.userName
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
                        let txt = allText.slice(startIndex);
                        const regex = /\d{1,2}:\d{1,2}(:\d{1,2})?/g;
                        let end = txt.replace(regex, '');
                        end = justText(end)
                        mapText.push(end)

                        return <div index={index}>
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
                                {
                                    user.user.role === `ADMIN` || commentInfo.userName === user.user.email
                                    ? <Button
                                        onClick={() => deleteComment(userName, textStr)}
                                            variant="outlined"
                                            color="error"
                                            style={{height: '30px', position: `absolute`, right: '70px'}}
                                        >
                                            Удалить
                                    </Button>
                                    : <div></div>
                                }
                            </Grid>
                            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                        </div>
                    })
                    : commentForTimeCode.map((commentInfo) => {
                            const textStr = commentInfo.text
                            const userName = commentInfo.userName
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
                            let txt = allText.slice(startIndex);
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
                                    {
                                        user.user.role === `ADMIN`
                                            ? <Button
                                                onClick={() => deleteComment(userName, textStr)}
                                                variant="outlined"
                                                color="error"
                                                style={{height: '30px', width: '85px', position: `absolute`, right: '70px'}}
                                                >
                                                    Удалить
                                                </Button>
                                            : <div></div>
                                    }
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