import React, {useEffect, useState} from 'react';
import './SelectionContentStyle.css'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {CONTENT_LIST_ROUTE} from "../../Routes/consts";
const SelectionContentList = () => {

    const contentInfo = useSelector(state => state.content.infoFilm);
    const [compilation, setCompilation] = useState([])
    const [url, setUrl] = useState('')
    const history = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        let checkUrlEnd = url.split('/');
        checkUrlEnd = checkUrlEnd[checkUrlEnd.length - 1];

       contentInfo.forEach((content, index) => {
            let checkUrlEndContent = content.route.split('/');
            checkUrlEndContent = checkUrlEndContent[checkUrlEndContent.length - 1];
            if (checkUrlEndContent === checkUrlEnd) {
                setUrl(checkUrlEndContent);
                setCompilation(content.selectionList);
            }
        })
    }, [])

    return (
        <ul>
            {
                compilation.map((section, index) => {
                    console.log(`${window.location.pathname}${CONTENT_LIST_ROUTE}${section.route}`)
                    return <li onClick={() => history(`${window.location.pathname}${CONTENT_LIST_ROUTE}${section.route}`)} className={'list-style-none'}>{section.name}</li>
                })
            }
        </ul>
    );
};

export default SelectionContentList;