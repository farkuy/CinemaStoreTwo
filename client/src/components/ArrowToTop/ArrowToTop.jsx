import React, {useState} from 'react';
import './ArrowToTopStyle.css'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import {IconButton} from "@mui/material";


const ArrowToTop = () => {
    const [showArrow, setShowArrow] = useState(`hidden`)

    window.addEventListener(`scroll`, () => {
        if (window.scrollY > window.innerHeight / 2) {
            setShowArrow(`visible`)
        } else {
            setShowArrow(`hidden`)
        }
    })

    return (
        <IconButton
        >
            <KeyboardDoubleArrowUpIcon
                color="primary"
                className={'arrow'}
                style={{visibility: `${showArrow}`}}
                onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo(0, 0)
                }}
            />
        </IconButton>
    );
};

export default ArrowToTop;