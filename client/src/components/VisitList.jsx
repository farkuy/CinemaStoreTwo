import React, {useMemo, useState} from 'react';
import Box from "@mui/material/Box";
import {Tab, Tabs, ThemeProvider, Typography} from "@mui/material";
import VisitSlider from "./VisitSlider/VisitSlider";
import RandomVisitSlider from "./VisitSlider/RandomVisitSlider";
import './VisitSlider/VisitSlideStyle.css'



const VisitList = () => {
    const [idList, setIdList] = useState([]);
    const [value, setValue] = React.useState(0);
    const [headerName, setHeaderName] = useState('Вы посещали')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useMemo(() => {
        let listId = JSON.parse(localStorage.getItem(`visitList`));
        if (!listId)
        {
            setIdList([]);
            setHeaderName('Случайный фильм')
            return
        }
        setIdList(listId)
    }, [])

    const randomKey = (x) => {
        return x * Math.random()
    }

    return (
        <div className={'flexCenter'}>
                <Typography variant="h4">{headerName}</Typography>
            <div className={'centerChildDiv'}>
                {
                    idList.length > 0
                        ?  <Box className={'box'}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                            >
                                {idList.map((inf, index) => (
                                    <div style={{margin: 10}}>
                                        <VisitSlider key={inf} info={inf}/>
                                        <Tab
                                            key={randomKey(inf)}>
                                        </Tab>
                                    </div>
                                ))}
                            </Tabs>
                        </Box>
                        :
                        <div>
                            <RandomVisitSlider/>
                            <Tab
                                key={value}>
                            </Tab>
                        </div>

                }
            </div>

        </div>
    );
};

export default VisitList;