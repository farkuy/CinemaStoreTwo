import React, {useEffect, useRef, useState} from 'react';
import ArrowToTop from "../ArrowToTop/ArrowToTop";
import {CircularProgress} from "@mui/material";
import {getСontentByTitle} from "../../http/kinopoiskApi";
import ContentBox from "../ContentBox/ContentBox";
import './SearchListStyle.css'
import {useSelector} from "react-redux";
import ModalWindow from "../ModalWindow/ModalWindow";

const SearchList = () => {

    const [page, setPage] = useState(1);
    const [contentList, setContentList] = useState([]);
    const [finallyContentList, setFinallyContentList] = useState([])
    const [load, setLoad] = useState(true);
    const paginationElement = useRef();
    const getSearch = useSelector(state => state.search)

    useEffect(() => {
        getСontentByTitle
            .getСontentByTitle(localStorage.getItem('search'), 1)
            .then(data => {
                console.log(data)
                setContentList([...data.items]);
                setFinallyContentList([ ...data.items]);
                setLoad(false);
            })
    }, [getSearch])

    useEffect(() => {
        getСontentByTitle
            .getСontentByTitle(localStorage.getItem('search'), page)
            .then(data => {
                console.log(data)
                setContentList([ ...contentList,...data.items]);
                setFinallyContentList([ ...finallyContentList,...data.items]);
                setLoad(false);
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
        setFinallyContentList([...arr])
    }

    if(load) {
        return <CircularProgress/>
    }

    return (
        <div>
            <ModalWindow filterContent={filterContent} infoAboutContentList={contentList}/>
            <ArrowToTop/>
            <div className={'list'}>
                {
                    finallyContentList.map((content, index) => {
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

export default SearchList;