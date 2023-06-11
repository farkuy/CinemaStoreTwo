import React from 'react';
import {Paper, Tab, Tabs} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const SelectionCategoreNavigation = ({}) => {
    const history = useNavigate();
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const cinemaInfo = useSelector(state => state.content.infoFilm)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                {
                    cinemaInfo.map((item, index) => {
                        return <Tab onClick={() => history(item.route)} label={item.name}></Tab>
                    })
                }
            </Tabs>
        </Paper>
    );
};

export default SelectionCategoreNavigation;