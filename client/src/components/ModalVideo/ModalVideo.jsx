import React, {useState} from 'react';
import {Button, IconButton, Modal} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import CommentForVideo from "../CommentForVideo/CommentForVideo";
import UserComment from "../UserCommet/UserComment";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `70%`,
    height: `90%`,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalVideo = ({trueId, url}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                onClick={handleOpen}
            >
                Смотреть
            </Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <VideoPlayer trueId={trueId} url={url}/>
                    <CommentForVideo url={url}/>
                    <UserComment url={url}/>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalVideo;