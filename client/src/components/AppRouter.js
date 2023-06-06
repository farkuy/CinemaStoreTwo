import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import StartPage from "../pages/StartPage";

const AppRouter = () => {
    const {user} = useContext(Context);

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
            <Route path='*' element={<StartPage/>}/>
        </Routes>
    );
};

export default AppRouter;