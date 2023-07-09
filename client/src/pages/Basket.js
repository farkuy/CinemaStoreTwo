import React, {useEffect, useState} from 'react';
import {showUserBasket} from "../http/basketApi";
import ContentBox from "../components/ContentBox/ContentBox";
import '../Styles/reUseStyle.css'
import {CircularProgress} from "@mui/material";

const Basket = () => {

    const [basketUserList, setBasketUserList] = useState([]);
    const [firstData, setFirstData] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        showUserBasket(Number (userId))
            .then(async (data) => {
                await setFirstData(data)
                setLoad(false)
            })
    }, [])


    if(load) {
        return <CircularProgress/>
    }
    const removeContent = (contentId) => {
        const filter = [...firstData].filter((content) => {
             if (contentId !== content.id) {
                 return true
             }
        });
        setFirstData(filter);
    };

    return (
        <div className={'list'}>
            {
                firstData.map((c) => {
                    return <ContentBox info={c} index={c.kinopoiskId} removeContent={removeContent}/>
                })
            }
        </div>
    );
};

export default Basket;