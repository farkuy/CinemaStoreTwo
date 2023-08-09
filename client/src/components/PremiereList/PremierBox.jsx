import React, {useEffect, useState} from 'react';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {CONTENT_ROUTE} from "../../Routes/consts";

const PremierBox = ({info}) => {
    const [day, setDaye] = useState(``);
    const [month, setMonth] = useState(``);
    const [year, setYear] = useState(``);
    const history = useNavigate()

    useEffect(() => {
        if (info.premiereRu) {
            const date = new Date(info.premiereRu)
            if (String(date.getDate()).length === 1) {
                const dateCor = `0${date.getDate()}`
                setDaye(dateCor)
            } else {
                setDaye(date.getDate());
            }
            if (String(date.getMonth()).length === 1) {
                const dateCor = `0${date.getMonth() + 1}`
                setMonth(dateCor)
            } else {
                setMonth(date.getMonth() + 1);
            }
            setYear(date.getFullYear());
        }
        if (info.releaseDate) {
            const date = new Date(info.releaseDate)
            if (String(date.getDate()).length === 1) {
                const dateCor = `0${date.getDate()}`
                setDaye(dateCor)
            } else {
                setDaye(date.getDate());
            }
            if (String(date.getMonth()).length === 1) {
                const dateCor = `0${date.getMonth() + 1}`
                setMonth(dateCor)
            } else {
                setMonth(date.getMonth() + 1);
            }
            setYear(date.getFullYear());
        }

    }, [])

    return (
        <div style={{height: '20%', width: "100%"}}>
            <ListItem
                alignItems="flex-start"
                onClick={() => {
                        if (info.filmId) {
                            history(`${CONTENT_ROUTE}/:${info.filmId}`);
                        }
                        if (info.kinopoiskId) {
                            history(`${CONTENT_ROUTE}/:${info.kinopoiskId}`);
                        }
                    }
                }
            >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={`${info.posterUrlPreview}`} />
                </ListItemAvatar>
                <ListItemText
                    style={{height: 80}}
                    primary={`${info.nameRu}`}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {`Дата выхода в России: ${day}.${month}.${year},`}
                            </Typography>
                            {` Мировая перьмера: ${info.year}`}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    );
};

export default PremierBox;