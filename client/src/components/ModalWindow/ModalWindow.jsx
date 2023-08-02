import React, {useState} from 'react';
import ContentFilter from "../contnentFilter/ContentFilter";
import {IconButton, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `40%`,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ModalWindow = ({filterContent, infoAboutContentList}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <IconButton style={{position: 'fixed', zIndex: 999}}  onClick={handleOpen} color="secondary">
                <SettingsIcon/>
            </IconButton>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <ContentFilter filterContent={filterContent} infoAboutContentList={infoAboutContentList}/>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalWindow;