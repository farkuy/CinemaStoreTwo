import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, filmSelection, publicRoutes, serialSelection} from "./routes";
import {Context} from "../index";
import StartPage from "../pages/StartPage";
import {useSelector} from "react-redux";
import ContentList from "../components/ContentList/ContentList";
import {CONTENT_LIST_ROUTE} from "./consts";

const AppRouter = () => {
    const {user} = useContext(Context);
    const [contentListRoute, setContentListRoute] = useState([])
    let contentInfo = useSelector(state => state.content);

    useEffect(() => {
        const updatedContentInfo = contentInfo.infoFilm.map((path, index) => {
            const maineUrl = contentInfo.infoFilm[index].route;
            if (path.selectionList) {
                const routes = path.selectionList.map(pat => `${maineUrl}${CONTENT_LIST_ROUTE}${pat.route}`);
                return routes;
            }
        });
        const updatedContentInfoSerial = contentInfo.infoSerial.map((path, index) => {
            const maineUrl = contentInfo.infoSerial[index].route;
            if (path.selectionList) {
                const routes = path.selectionList.map(pat => `${maineUrl}${CONTENT_LIST_ROUTE}${pat.route}`);
                return routes;
            }
        });
        const finallyArr = [...updatedContentInfo, ...updatedContentInfoSerial]
        let merged = [].concat.apply([], finallyArr);
        setContentListRoute([...merged]);
    }, []);

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
            {
                filmSelection.map(({path, Component}) => {
                    return <Route key={path} path={path} element={Component}/>
                })
            }
            {
                serialSelection.map(({path, Component}) => {
                    return <Route key={path} path={path} element={Component}/>
                })
            }
            {
                contentListRoute.map((path, index) => {
                    if (path) {
                        return <Route key={index} path={`${path}`} element={<ContentList/>}/>
                    }
                })
            }
        </Routes>
    );
};

export default AppRouter;