import React, {useEffect, useMemo, useState} from 'react';
import {showUserBasket} from "../http/basketApi";
import ContentBox from "../components/ContentBox/ContentBox";
import {getMovieById} from "../http/kinopoiskApi";

const Basket = () => {

    const [basketUserList, setBasketUserList] = useState([]);
    const [firstData, setFirstData] = useState([])

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        showUserBasket(Number (userId))
            .then(async (data) => {
                await setFirstData(data)
            })
    }, [])

    useMemo(() => {
        const fetchData = async () => {
            const finallyArr = [];
            for (let i = 0; i < firstData.length; i++) {
                const c = firstData[i];
                const data = await getMovieById.getFilmInfoForBasket(c.contentId);
                finallyArr.push(data);
            }
            setBasketUserList(finallyArr);
        };

        fetchData();
    }, [firstData]);

    return (
        <div>
            {
                basketUserList.map((c) => {
                    return <ContentBox info={c} index={c.kinopoiskId}/>
                })
            }
        </div>
    );
};

export default Basket;