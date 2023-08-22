import React, {useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import Box from "@mui/material/Box";

const UserComment = () => {

    const [textareaText, setTextareaText] = useState('');

    const postComment = () => {
        const timeRegex = /\d{1,2}:\d{1,2}(:\d{1,2})?/g;
        const timeCodes = textareaText.match(timeRegex);
        const finallyRegex = timeCodes.map((t) => {
           let time = t.split(`:`);
           time = time.map((tm) => {
               if (tm.length === 1) return `0${tm}`;
               return tm
           })
            return time
        })
        console.log(finallyRegex)
    }

    return (
        <div>
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