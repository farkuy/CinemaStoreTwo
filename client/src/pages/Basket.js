import React, {useEffect, useMemo, useState} from 'react';
import {showUserBasket} from "../http/basketApi";
import ContentBox from "../components/ContentBox/ContentBox";
import '../Styles/reUseStyle.css'
import {Button, CircularProgress} from "@mui/material";
import ModalWindow from "../components/ModalWindow/ModalWindow";
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import '../Styles/BasketStyle.css'

const Basket = () => {

    const [basketFilterUserList, setBasketFilterUserList] = useState([]);
    const [firstData, setFirstData] = useState([]);
    const [load, setLoad] = useState(true);
    const [arrowUp, setArrowUp] = useState(true);

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

    const filterContent = (arr) => {
        setBasketFilterUserList([...arr])
    }

    const firstTheOldOnes = (e) => {
        e.preventDefault();

       basketFilterUserList.sort((a, b) => {
            return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        })
        setArrowUp(false)
    }

    const recentlyAdded = (e) => {
        e.preventDefault();

        basketFilterUserList.sort((a, b) => {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        })
        setArrowUp(true)
    }

    return (
        <div>
            <ModalWindow filterContent={filterContent} infoAboutContentList={firstData}/>
            {
                arrowUp
                ? <Button
                        onClick={firstTheOldOnes}
                        variant="outlined"
                        style={{position: 'fixed', zIndex: 999, left: '50px', top: '80px'}}
                    >
                        По дате
                        <SouthIcon />
                    </Button>

                : <Button
                        onClick={recentlyAdded}
                        variant="outlined"
                        style={{position: 'fixed', zIndex: 999, left: '50px', top: '80px'}}
                    >
                        По дате
                        <NorthIcon />
                    </Button>
            }
            <div className={'list'}>
                {
                    basketFilterUserList.map((c) => {
                        console.log(c)
                        return <ContentBox info={c} index={c.kinopoiskId} removeContent={removeContent}/>
                    })
                }
            </div>
        </div>

    );
};

export default Basket;