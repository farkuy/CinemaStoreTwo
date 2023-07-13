import React, {useMemo, useState} from 'react';
import Box from "@mui/material/Box";
import {Button, Card, CardContent, Typography} from "@mui/material";
import {requestAddNewAdmin} from "../../../http/userApi";
import SnackbarMessage from "../../SnackbarMessages/SnackbarMessage";
const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
const UserSearchBox = ({user}) => {

    const [background, setBackground] = useState('');
    const [openWindow, setOpenWindow] = useState(false);
    const [infoMessage, setInfoMessage] = useState(``)

    useMemo(() => {
        if (user.role === 'ADMIN') {
            setBackground('linear-gradient(-45deg, #a3e6b1, #69d4a6)')
        } else {
            setBackground('linear-gradient(-45deg, #cccccc, #999999)')
        }
    }, [])

    const addNewAdmin = async (e) => {
        e.preventDefault();
        const id = user.id
        await requestAddNewAdmin(id)
            .then(data => {
                setInfoMessage(data)
                setOpenWindow(true);
            })
    }

    const close = (x) => {
        setOpenWindow(false)
    }

    return (
        <div>
            <Card
                style={{background:`${background}`}}
                sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    </Typography>
                    <Typography variant="h5" component="div">
                        {user.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.role}
                    </Typography>
                    {
                        user.role !== 'ADMIN'
                            ? <Typography variant="body2">
                                <Button
                                    onClick={addNewAdmin}
                                >
                                    Сделать администратором
                                </Button>
                            </Typography>
                            : <div></div>
                    }

                </CardContent>
            </Card>
            <SnackbarMessage setOpenWindow={setOpenWindow} close={close} info={infoMessage} openWindow={openWindow}/>
        </div>
    );
};

export default UserSearchBox;