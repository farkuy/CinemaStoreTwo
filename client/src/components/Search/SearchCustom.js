import React, {useEffect, useMemo, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import './SerachStyle.css'
import {getСontentByTitle} from "../../http/kinopoiskApi";
import {CONTENT_ROUTE, SEARCH_LIST_ROUTE} from "../../Routes/consts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateSearch} from "../../toolkitRedux/searchReduser";
const SearchCustom  = () => {

    const [search, setSearch] = useState(``);
    const [timerId, setTimerId] = useState(null);
    const [contentList, setContentList] = useState([]);
    const [visibleList, setVisibleList] = useState('visible')
    const history = useNavigate();
    const dispatch = useDispatch();

    const searchContent = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        clearTimeout(timerId);
    };

    useMemo(() => {
        if(search.length === 0) {
            setContentList([]);
            return
        }

        setTimerId(setTimeout(() => {
            getСontentByTitle
                .getСontentByTitle(search, 1)
                .then(data => {
                    setContentList(data.items)
                })
        }, 300));
    }, [search])


    const getSearchList = (e) => {
        e.stopPropagation();
        e.preventDefault();

        localStorage.removeItem('search');
        localStorage.setItem('search', search);
        dispatch(updateSearch(localStorage.getItem('search')));
        history(SEARCH_LIST_ROUTE);
    }

    const filmMove = (e, film) => {
        e.stopPropagation();
        e.preventDefault();

        if (film.kinopoiskId) {
            localStorage.removeItem('search');
            localStorage.setItem('search', search);
            dispatch(updateSearch(localStorage.getItem('search')));
            history(`${CONTENT_ROUTE}/:${film.kinopoiskId}`)
        } else {
            alert('Такой фильм не найден')
        }
    }

    const onBlur = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setVisibleList('hidden');
        }, 150);
    }

    const focus = (e) => {
        e.preventDefault();

        if(search.length > 0) {
            setVisibleList(`visible`)
        }
    }


    return (
        <Box sx={{ color: 'black', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <div className={'search'}>
                <SearchIcon sx={{ marginRight: '10px', color: 'rgba(255, 255, 255, 1)' }} />
                <Input
                    list="brow"
                    value={search}
                    placeholder={'search...'}
                    onChange={searchContent}
                    onBlur={onBlur}
                    onFocus={focus}
                    sx={{width: `100px`,color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.1rem'}}
                    disableUnderline

                />
            </div>
            {
                contentList.length > 0
                    ?
                    <div className={'rel'}>
                        <div style={{visibility: `${visibleList}`}} className={'container'}>
                            <ul
                                className={'parent'}
                            >
                                {contentList.map((content, index) => {
                                    return <li
                                        onClick={(e) => filmMove(e, content)}
                                        className={'child'}
                                    >
                                        {content.nameRu}
                                    </li >
                                })}
                                <li
                                    onClick={getSearchList}
                                    style={{color: 'red'}}
                                    className={'child'}
                                >
                                    Показать все оставшиеся запросы...
                                </li>
                            </ul>
                        </div>
                    </div>

                    : <div></div>

            }
        </Box>
    )
}

export default SearchCustom;

