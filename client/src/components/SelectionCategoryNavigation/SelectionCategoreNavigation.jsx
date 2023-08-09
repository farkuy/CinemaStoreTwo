import React, {useEffect, useMemo, useState} from 'react';
import {Paper, Tab, Tabs} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const SelectionCategoreNavigation = ({}) => {
    const history = useNavigate();
    const [value, setValue] = useState(0);
    const route = useSelector(state => state.content);
    const [cinemaInfo, setCinemaInfo] = useState([]);

    useMemo((newValue) => {
        let urlNow = window.location.href;
        let check = urlNow.split('/');
        check = check[check.length - 2]
        if (route.infoFilm[0].route.split('/')[1] === check) {
            urlNow = urlNow.split('/');
            urlNow = urlNow[urlNow.length - 1]
            setCinemaInfo(route.infoFilm)
            cinemaInfo.forEach((item) => {
                let urlCheck = item.route.split('/');
                urlCheck = urlCheck[urlCheck.length - 1];
                if (urlCheck === urlNow) {
                    setValue(item.changeValue)
                }
            })
        }
        if (route.infoSerial[0].route.split('/')[1] === check) {
            urlNow = urlNow.split('/');
            urlNow = urlNow[urlNow.length - 1]
            setCinemaInfo(route.infoSerial)
            cinemaInfo.forEach((item) => {
                let urlCheck = item.route.split('/');
                urlCheck = urlCheck[urlCheck.length - 1];
                if (urlCheck === urlNow) {
                    setValue(item.changeValue)
                }
            })
        }
    }, [window.location.href])

    useEffect(() => {
        let urlNow = window.location.href;
        let check = urlNow.split('/');
        check = check[check.length - 2]
        if (route.infoFilm[0].route.split('/')[1] === check) {
            urlNow = urlNow.split('/');
            urlNow = urlNow[urlNow.length - 1]
            setCinemaInfo(route.infoFilm)
            cinemaInfo.forEach((item) => {
                let urlCheck = item.route.split('/');
                urlCheck = urlCheck[urlCheck.length - 1];
                if (urlCheck === urlNow) {
                    setValue(item.changeValue)
                }
            })
        }
        if (route.infoSerial[0].route.split('/')[1] === check) {
            urlNow = urlNow.split('/');
            urlNow = urlNow[urlNow.length - 1]
            setCinemaInfo(route.infoSerial)
            cinemaInfo.forEach((item) => {
                let urlCheck = item.route.split('/');
                urlCheck = urlCheck[urlCheck.length - 1];
                if (urlCheck === urlNow) {
                    setValue(item.changeValue)
                }
            })
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {
                    cinemaInfo.map((item, index) => {
                        return <Tab onClick={() => history(item.route)} label={item.name}></Tab>
                    })
                }
            </Tabs>
        </Paper>
    );
};

export default SelectionCategoreNavigation;