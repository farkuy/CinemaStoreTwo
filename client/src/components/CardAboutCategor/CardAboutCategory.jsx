import React, {useEffect, useMemo, useState} from 'react';
import Box from "@mui/material/Box";
import {Card, CardContent, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {checkReview, getNameList, getNamesList, setNameList, setNameListFunc} from "../../http/userApi";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
const CardAboutCategory = ({info}) => {
    const getApiInfo = useSelector(state => state.compilation)
    const [nameList, setNameList] = useState('')

    useMemo(() => {
        try
        {
            const url = window.location.href;
            let merged = [].concat.apply([], getApiInfo);
            if (url.indexOf('serial') !== -1)
            {
                merged.forEach( async (obj) => {
                    if (obj.url === info.route) {
                        const arrName = await getNameList('serial', info.route)
                        if (arrName) {
                            setNameList(arrName)
                            return
                        }
                        let list = await obj.getApi(1);
                        list = list.items
                        let nameList = list.filter(item => item.nameRu).map(item => item.nameRu).join(', ');
                        nameList = nameList.substr(0, 250).split(', ')
                        nameList = nameList.slice(0, nameList.length - 1).join(', ')
                        const arrNewName = await setNameListFunc('serial', info.route, nameList);
                        setNameList(arrNewName)
                    }
                })
            }
            if (url.indexOf('cinema') !== -1) {
                merged.forEach( async (obj) => {
                    if (obj.url === info.route)
                    {
                        const arrName = await getNameList('cinema', info.route)
                        if (arrName) {
                            setNameList(arrName)
                            return
                        }
                        let list = await obj.getApi(1);
                        if (list.films)
                        {
                            list = list.films
                            let nameList = list.filter(item => item.nameRu).map(item => item.nameRu).join(', ');
                            nameList = nameList.substr(0, 250).split(', ')
                            nameList = nameList.slice(0, nameList.length - 1).join(', ')
                            const arrNewName = await setNameListFunc('cinema', info.route, nameList);
                            setNameList(arrNewName)
                        }
                        if (list.items) {
                            list = list.items
                            let nameList = list.filter(film => film.type === "FILM").filter(item => item.nameRu).map(item => item.nameRu).join(', ');
                            nameList = nameList.substr(0, 250).split(', ')
                            nameList = nameList.slice(0, nameList.length - 1).join(', ')
                            const arrNewName = await setNameListFunc('cinema', info.route, nameList);
                            setNameList(arrNewName)
                        }
                    }
                })
            }
        }
        catch (e) {
            setNameList('')
        }
    }, [info])

    return (
        <Card
            style={{background: `linear-gradient(-45deg, #faf0cd, #fab397`}}
            sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Все фильмы в категории:
                </Typography>
                <Typography variant="h5" component="div">
                    {info.name[0].toUpperCase() + info.name.slice(1)}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                </Typography>
                <Typography variant="body2">
                    {nameList}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardAboutCategory;