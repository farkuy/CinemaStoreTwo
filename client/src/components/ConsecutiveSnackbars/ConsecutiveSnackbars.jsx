import React, {useEffect, useState} from 'react';
import {Button, IconButton, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {setValueComment} from "../../toolkitRedux/commentTimeCodeReducer";


export default function ConsecutiveSnackbars({positionMessage, commentForTimeCode}) {
    const dispatch = useDispatch();
    const timeCodeCommentRedux = useSelector((state) => state.commentTimeCodeReducer.comment);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ left: `0px`, top: `0px`});
    const [message, setMessage] = useState('');

    useEffect(() => {
        setPosition({left: `${positionMessage.x}px`, top: `${positionMessage.y}px`});
        setMessage(`Показать комменатри на ${positionMessage.value}`)
        setOpen(true);
    }, [positionMessage])
    const handleClose = () => {
        setOpen(false)
    }

    const setTimeCodeComment = () => {
        dispatch(setValueComment(commentForTimeCode))
        setOpen(false)
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                onClose={handleClose}
                message={message}
                style={{position: 'absolute', zIndex: '1', left: `${position.left}`, top: `${position.top}`}}
                autoHideDuration={3000}
                action={
                    <React.Fragment>
                        <Button
                            color="primary"
                            size="small"
                            onClick={setTimeCodeComment}
                        >
                            Открыть
                        </Button>
                        <IconButton>
                            <CloseIcon
                                onClick={handleClose}
                            />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>

    );
}
