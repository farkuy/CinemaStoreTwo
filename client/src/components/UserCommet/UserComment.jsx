import React, {useContext, useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {postCommentServer} from "../../http/userApi";
import {Context} from "../../index";
import './UserCommentStyle.css'

const UserComment = ( {url} ) => {
    const {user} = useContext(Context);
    const [textareaText, setTextareaText] = useState('');

    const postComment = () => {
        const timeRegex = /\d{1,2}:\d{1,2}(:\d{1,2})?/g;
        const timeCodes = textareaText.match(timeRegex);
        let finallyRegex = [];
        if (timeCodes)
        {
            finallyRegex = timeCodes.map((t) => {
                let time = t.split(`:`);
                return time.join(':')
            })
        }

        if(user.isAuth)
        {
            const userInfo = user.user
            console.log(userInfo, finallyRegex)
            postCommentServer(userInfo.id, url, userInfo.email, textareaText, ' ', userInfo.role, new Date(), finallyRegex)
                .then(data => {
                    console.log(data)
                })
        }
    }

    return (
        <div className={'userComment'}>
            <textarea
                value={textareaText}
                placeholder={'Комментарий'}
                onChange={(e) => setTextareaText(e.target.value)}
                style={{width: `100%`, height: '65%', fontSize: '1.1rem'}}
            />
            <Button
                onClick={postComment}
            >
                Отправить
            </Button>
        </div>
    );
};

export default UserComment;