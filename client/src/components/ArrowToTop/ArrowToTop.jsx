import React, {useState} from 'react';
import './ArrowToTopStyle.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {Button, makeStyles} from "@mui/material";

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
        <Button
            onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, 0)
            }}
            style={{borderRadius: '50%', width: '56px', height: '56px', visibility: `${showArrow}`, position: 'fixed'}}
            variant="contained"
            startIcon={<ArrowUpwardIcon />}>
        </Button>
    );
};

export default ArrowToTop;