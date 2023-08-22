import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import './UserReviewStyle.css'
import {addReview, checkReview, editReview} from "../../http/userApi";
import SnackbarMessage from "../SnackbarMessages/SnackbarMessage";
import {Context} from "../../index";

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

const UserReview = ({filmInfo, reloadReviewList, setUpdateReviewList, updateReviewList}) => {
    const {user} = useContext(Context);
    const [maineInfo, setMaineInf0] = useState(filmInfo)
    const [open, setOpen] = useState(false);
    const [textareaText, setTextareaText] = useState('');
    const [h1Text, setH1Text] = useState('')
    const [appraisal, setAppraisal] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [openWindow, setOpenWindow] = useState(false);
    const [infoAboutAddReview, setInfoAboutAddReview] = useState('');
    const [checkReviewNow, setCheckReviewNow] = useState(false);
    const [disabledOldInfoBtn, setDisabledOldInfoBtn] = useState(true)
    const [oldTextareaReview, setOldTextareaReview] = useState('');
    const [oldAppraisal, setOldAppraisal] = useState('');
    const [oldH1Text, setOldH1Text] = useState('')


    useEffect(() => {
        setMaineInf0(filmInfo)
    }, [filmInfo])

    useMemo(() => {
        if (appraisal.length !== 0 && textareaText.length !== 0 && h1Text.length !== 0) {
            setDisabledBtn(false)
        }
        else {
            setDisabledBtn(true)
        }
    }, [appraisal, textareaText]);
    useMemo(() => {
        if (appraisal !== oldAppraisal || textareaText !== oldTextareaReview || oldH1Text !== h1Text && h1Text.length !== 0 && appraisal.length !== 0 && textareaText.length !== 0) {
            setDisabledOldInfoBtn(false)
        }
        else {
            setDisabledOldInfoBtn(true)
        }
    }, [appraisal, textareaText])

    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        setAppraisal(event.target.value);
    };

    const addUserReview = async (e) => {
        e.preventDefault();

        if (user) {
            const userName = user.user.email;
            const userId = user.user.id;
            await addReview(maineInfo.kinopoiskId, userName, textareaText, userId, h1Text, appraisal)
                .then(data => {
                    setInfoAboutAddReview(data);
                    setTextareaText('');
                    setAppraisal('')
                    setH1Text('')
                    setOpenWindow(true);
                    setOpen(false);
                    reloadReviewList()
                })
        }
    }
    const handleOpen = async () => {
        setOpen(true);

        if (user) {
            const userName = user.user.email;
            const userId = user.user.id;
            let check = await checkReview(maineInfo.kinopoiskId, userName, userId);
            if (check.userId) {
                await setTextareaText(check.text);
                await setOldTextareaReview(check.text);
                await setAppraisal(check.appraisal);
                await setH1Text(check.h1)
                await setOldH1Text(check.h1)
                await setOldAppraisal(check.appraisal);
                await setDisabledOldInfoBtn(true);
                await setCheckReviewNow(true);
            } else {
                setTextareaText('');
                setAppraisal('')
                setH1Text('');
                setCheckReviewNow(false)
            }
        }
    }
    // :TODO сделать лоудинг на пагинации и ее конец
    const editReviewNow = async (e) => {
        if (user) {
            const userName = user.user.email;
            const userId = user.user.id;
            const edit = await editReview(maineInfo.kinopoiskId, userName, textareaText, userId, h1Text, appraisal)
            setInfoAboutAddReview(edit);
            setOpen(false)
            reloadReviewList()
        }
    }

    const close = (x) => {
        setOpenWindow(false)
    }

    return (
        <div>
            <Button onClick={handleOpen}>Оставить отзыв</Button>
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
                        Оставить отзыв на фильм: {maineInfo.nameRu}
                    </Typography>
                    <textarea
                        value={h1Text}
                        onChange={(e) => setH1Text(e.target.value)}
                        placeholder={'Заголовок'}
                        style={{width: `100%`, height: '5%', fontSize: '1.1rem'}}
                    />
                    <textarea
                        value={textareaText}
                        placeholder={'Текст отзыва'}
                        onChange={(e) => setTextareaText(e.target.value)}
                        style={{width: `100%`, height: '65%', fontSize: '1.1rem'}}
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