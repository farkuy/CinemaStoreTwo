import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Divider, Grid, Paper} from "@mui/material";
import {checkComment} from "../../http/userApi";
import {Context} from "../../index";

const CommentForVideo = ({url}) => {
    const {user} = useContext(Context);
    const [comment, setComment] = useState([])

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
        <div style={{maxHeight: 250, overflow: 'auto', padding: '0 5% 0 5%'}}>
            <h1>Comments</h1>
            {
                comment.map((v) => {
                    return <div>ewedw</div>
                })
            }
            <Paper style={{ padding: "40px 20px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp"/>
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                        <p style={{ textAlign: "left" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                            Suspendisse congue vulputate lobortis. Pellentesque at interdum
                            tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                            sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                            metus, efficitur lobortis nisi quis, molestie porttitor metus.
                            Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                            tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                            lectus vitae ex.{" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar alt="Remy Sharp"/>
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                        <p style={{ textAlign: "left" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                            luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                            Suspendisse congue vulputate lobortis. Pellentesque at interdum
                            tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                            sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                            metus, efficitur lobortis nisi quis, molestie porttitor metus.
                            Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                            tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                            lectus vitae ex.{" "}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            posted 1 minute ago
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default CommentForVideo;