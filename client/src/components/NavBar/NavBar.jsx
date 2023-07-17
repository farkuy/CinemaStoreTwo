import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, START_ROUTE} from "../../Routes/consts";
import SearchCustom from "../Search/SearchCustom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const NavBar = () => {
    const {user} = useContext(Context);
    const history = useNavigate();
    const [role, setRole] = useState('');
    const [id, setId] = useState(-1);

    useEffect(() => {
        const user = localStorage.getItem('token');
        if (user) {
            const roleUser = jwtDecode(user).role
            setRole(roleUser)
            const id = jwtDecode(user).id;
            setId(id)
        }
    }, [])
    const logIn = (e) => {
        e.preventDefault();
        user.setIsAuth(true);
        history(LOGIN_ROUTE)
    }
    const logOut = (e) => {
        e.preventDefault();
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        history(START_ROUTE);
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <BurgerMenu/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cinema
                    </Typography>
                    <SearchCustom/>
                    {
                        window.innerWidth < 527
                        ? <div></div>
                        : user.isAuth
                                ? <div style={{display: "flex", flexDirection: "row"}}>
                                    {
                                        role === "ADMIN"
                                            ? <Button
                                                color="inherit"
                                                onClick={(e) => history(ADMIN_ROUTE)}
                                            >
                                                Админ панель
                                            </Button>
                                            : <div></div>
                                    }
                                    <Button
                                        color="inherit"
                                        onClick={(e) => history(BASKET_ROUTE)}
                                    >
                                        Мои фильмы
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={logOut}
                                    >
                                        Выйти
                                    </Button>
                                </div>
                                :
                                <Button color="inherit"
                                        onClick={logIn}
                                >
                                    Войти
                                </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;