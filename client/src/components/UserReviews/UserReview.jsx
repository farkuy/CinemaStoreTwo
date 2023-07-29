import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import './UserReviewStyle.css'
import {addReview, checkReview, editReview} from "../../http/userApi";
import jwt_decode from "jwt-decode";
import SnackbarMessage from "../SnackbarMessages/SnackbarMessage";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UserReview = ({filmInfo}) => {
    const [open, setOpen] = useState(false);
    const [textareaText, setTextareaText] = useState('');
    const [appraisal, setAppraisal] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [openWindow, setOpenWindow] = useState(false);
    const [infoAboutAddReview, setInfoAboutAddReview] = useState('');
    const [checkReviewNow, setCheckReviewNow] = useState(false);
    const [disabledOldInfoBtn, setDisabledOldInfoBtn] = useState(true)
    const [oldTextareaReview, setOldTextareaReview] = useState('');
    const [oldAppraisal, setOldAppraisal] = useState('')

    useMemo(() => {
        if (appraisal.length !== 0 && textareaText.length !== 0) {
            setDisabledBtn(false)
        }
        else {
            setDisabledBtn(true)
        }
    }, [appraisal, textareaText]);
    useMemo(() => {
        if (appraisal !== oldAppraisal || textareaText !== oldTextareaReview && appraisal.length !== 0 && textareaText.length !== 0) {
            setDisabledOldInfoBtn(false)
        } else {
            setDisabledOldInfoBtn(true)
        }
    }, [appraisal, textareaText])

    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        setAppraisal(event.target.value);
    };

    const addUserReview = async (e) => {
        e.preventDefault();

        let profile = localStorage.getItem('token');
        if (profile) {
            profile = jwt_decode(profile);
            const userName = profile.email;
            const userId = profile.id;
            await addReview(filmInfo.kinopoiskId, userName, textareaText, userId, appraisal)
                .then(data => {
                    setInfoAboutAddReview(data);
                    setTextareaText('');
                    setAppraisal('')
                    setOpenWindow(true);
                    setOpen(false);
                })
        }
    }
    const handleOpen = async () => {
        setOpen(true);
        let profile = localStorage.getItem('token');
        if (profile) {
            profile = jwt_decode(profile);
            const userName = profile.email;
            const userId = profile.id;
            let check = await checkReview(filmInfo.kinopoiskId, userName, userId);
            if (check.userId) {
                await setTextareaText(check.text);
                await setOldTextareaReview(check.text);
                await setAppraisal(check.appraisal);
                await setOldAppraisal(check.appraisal);
                await setDisabledOldInfoBtn(true);
                await setCheckReviewNow(true);
            }
        }
    }
    const editReviewNow = async (e) => {
        let profile = localStorage.getItem('token');
        if (profile) {
            profile = jwt_decode(profile);
            const userName = profile.email;
            const userId = profile.id;
            console.log(filmInfo.kinopoiskId, userName, textareaText, userId, appraisal)
            const edit = await editReview(filmInfo.kinopoiskId, userName, textareaText, userId, appraisal)
            setInfoAboutAddReview(edit);
            setOpen(false)
        }
    }

    const close = (x) => {
        setOpenWindow(false)
    }

    return (
        <div>
            <Button onClick={handleOpen}>Оставить отыв</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Оставить отзыв на фильм: {filmInfo.nameRu}
                    </Typography>
                    <textarea
                        value={textareaText}
                        onChange={(e) => setTextareaText(e.target.value)}
                        style={{width: `100%`, height: '70%', fontSize: '1.1rem'}}
                    />
                    <div className={'flex'}>
                        <Box className={'box'}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Понравился ли вам фильм</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={appraisal}
                                    label="Понравился ли вам фильм"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'POSITIVE'}>Понравилось</MenuItem>
                                    <MenuItem value={'NEUTRAL'}>Средняк</MenuItem>
                                    <MenuItem value={'NEGATIVE'}>Не понравилось</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {
                            checkReviewNow
                            ? <Button
                                    disabled={disabledOldInfoBtn}
                                    onClick={editReviewNow}
                                >
                                    Отредактировать
                                </Button>

                            :   <Button
                                     disabled={disabledBtn}
                                    onClick={addUserReview}
                                 >
                                    Отправить
                                 </Button>
                        }

                    </div>
                </Box>
            </Modal>
            <SnackbarMessage setOpenWindow={setOpenWindow} close={close} info={infoAboutAddReview} openWindow={openWindow}/>
        </div>
    );
};

export default UserReview;