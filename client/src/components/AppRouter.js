import React, {useContext, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import Cinema from "../pages/Cinema";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);

    console.log(user)

    return (
        <Routes>
            {
                user.isAuth && authRoutes.map(({path, Component}) => {
                     return <Route key={path} path={path} element={Component}/>
                })
            }
            {
                publicRoutes.map(({path, Component}) => {
                    return <Route key={path} path={path} element={Component}/>
                })
            }
            <Route path='*' element={<Cinema/>}/>
        </Routes>
    );
};

export default AppRouter;