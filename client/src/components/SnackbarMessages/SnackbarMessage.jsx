import React, {useEffect, useState} from 'react';
import {IconButton, Snackbar} from "@mui/material";

const SnackbarMessage = ({info, openWindow, close, setOpenWindow}) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(openWindow)
    }, [openWindow, info])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
        setOpenWindow(false)
    };


    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={`${info}`}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            X
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
};

export default SnackbarMessage;