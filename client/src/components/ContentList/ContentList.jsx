import React, {useEffect, useRef, useState} from 'react';
import ContentBox from "../ContentBox/ContentBox";
import './ContentListSryle.css'
import {useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import ModalWindow from "../ModalWindow/ModalWindow";
import ArrowToTop from "../ArrowToTop/ArrowToTop";
const ContentList = () => {

    // TODO на больших разрешениях неплохо было бы растянуть, картинку для надписи обрезать снизу, при наведении показывать полностью без подписи
    const getApiInfo = useSelector(state => state.compilation)

    const [contentList, setContentList] = useState([]);
    const [filterConentList, setFilterConentList] = useState([])
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(true);
    const paginationElement = useRef();

    useEffect(() => {
        let merged = [].concat.apply([], getApiInfo);
        let maineUrlEnd = window.location.href;
        maineUrlEnd = maineUrlEnd.split('/');
        maineUrlEnd = `/${maineUrlEnd[maineUrlEnd.length - 1]}`
        merged.forEach((obj, index) => {
            if(obj.url === maineUrlEnd) {
                obj.getApi(page)
                    .then(data => {
                        if (data.films) {
                            if (data.films.length === 0) return;
                            setContentList([...contentList, ...data.films])
                            setFilterConentList([...contentList, ...data.films])
                            setLoad(false)
                        }
                        else {
                            const url = window.location.href;
                            if (url.includes('cinema')) {
                                if (data.items.length === 0) return;
                                const film = data.items.filter((film) => {
                                    if(film.type === "FILM") return film
                                })
                                setContentList([...contentList, ...film])
                                setFilterConentList([...contentList, ...film])
                                setLoad(false)
                                return
                            }
                            if (url.includes('serial')) {
                                if (data.items.length === 0) return;
                                const serials = data.items.filter((serial) => {
                                    if(serial.type === "MINI_SERIES" || serial.type === "TV_SERIES") return serial
                                })
                                console.log(serials)
                                setContentList([...contentList, ...serials])
                                setFilterConentList([...contentList, ...serials])
                                setLoad(false)
                                return;
                            }
                        }
                    })
            }
        })
    }, [page])


    useEffect(() => {
        const handleScroll = () => {
            try {
                const topOffset = paginationElement.current.getBoundingClientRect().top;
                if (topOffset <= window.innerHeight) {
                    setPage(page + 1);
                }
            } catch (e) {
                return
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
            <ArrowToTop/>
            <ModalWindow filterContent={filterContent} infoAboutContentList={contentList}/>
            <div className={'list'}>
                {
                    filterConentList.map((content, index) => {
                        return <ContentBox key={content.id} info={content}/>
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