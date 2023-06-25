import React, {useEffect, useRef, useState} from 'react';
import ContentBox from "../ContentBox/ContentBox";
import './ContentListSryle.css'
import {useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import ContentFilter from "../contnentFilter/ContentFilter";
import ModalWindow from "../ModalWindow/ModalWindow";
const ContentList = () => {

    const getApiInfo = useSelector(state => state.compilation)

    const [contentList, setContentList] = useState([]);
    const [filterConentList, setFilterConentList] = useState([])
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(true);
    const paginationElement = useRef();

    useEffect(() => {
        let maineUrlEnd = window.location.href;
        maineUrlEnd = maineUrlEnd.split('/');
        maineUrlEnd = `/${maineUrlEnd[maineUrlEnd.length - 1]}`
        getApiInfo.forEach((obj, index) => {
            if(obj.url === maineUrlEnd) {
                obj.getApi(page)
                    .then(data => {
                        setContentList([...contentList, ...data.films])
                        setFilterConentList([...contentList, ...data.films])
                        setLoad(false)
                    })
            }
        })
    }, [page])

    useEffect(() => {
        const handleScroll = () => {
            const topOffset = paginationElement.current.getBoundingClientRect().top;
            if (topOffset <= window.innerHeight) {
                setPage(page + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [contentList]);

    const filterContent = (arr) => {
        setFilterConentList([...arr])
    }

    if(load) {
        return <CircularProgress/>
    }

    return (
        <div>
            <ModalWindow filterContent={filterContent} infoAboutContentList={contentList}/>
            <div className={'list'}>
                {
                    filterConentList.map((content, index) => {
                        return <ContentBox info={content}/>
                    })
                }
                {
                    load
                        ? <div></div>
                        : <div ref={paginationElement} style={{height: 20, background: `red`}}></div>
                }
            </div>
        </div>

    );
};

export default ContentList;