import React, {useEffect, useState} from 'react';
import ContentBox from "../ContentBox/ContentBox";
import './ContentListSryle.css'
import {useSelector} from "react-redux";
const ContentList = () => {

    const getApiInfo = useSelector(state => state.compilation)

    const [contentList, setContentList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        let maineUrlEnd = window.location.href;
        maineUrlEnd = maineUrlEnd.split('/');
        maineUrlEnd = `/${maineUrlEnd[maineUrlEnd.length - 1]}`
        console.log(getApiInfo, maineUrlEnd)
        getApiInfo.forEach((obj, index) => {
            if(obj.url === maineUrlEnd) {
                obj.getApi(page)
                    .then(data => {
                        console.log(data.films)
                        setContentList([...contentList, ...data.films])
                    })
            }
        })
    }, [])

    return (
        <div className={'list'}>
            {
                contentList.map((content, index) => {
                    return <ContentBox info={content}/>
                })
            }
        </div>
    );
};

export default ContentList;