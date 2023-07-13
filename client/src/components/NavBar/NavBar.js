import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {AppBar, Button, Container, Stack, Toolbar, Typography} from "@mui/material";
import SearchCustom from "../Search/SearchCustom";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, START_ROUTE} from "../../Routes/consts";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Box from "@mui/material/Box";
import jwtDecode from "jwt-decode";

const NavBar = () => {
    const {user} = useContext(Context);
    const history = useNavigate();
    const [role, setRole] = useState('');

    useEffect(() => {
        let roleUser = localStorage.getItem('token');
        if (roleUser) {
            roleUser = jwtDecode(roleUser).role
            setRole(roleUser)
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
        <AppBar position={'relative'}>
            <Container fixed>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <BurgerMenu/>
                    <Toolbar>
                        <Stack
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                            spacing={{ xs: 1, sm: 2, md: 45 }}
                        >
                            <NavLink to={START_ROUTE}>
                                <Typography variant={'h6'}>Cinema</Typography>
                            </NavLink>
                            <SearchCustom/>
                            {
                                user.isAuth
                                    ? <div style={{display: "flex", flexDirection: "row"}}>
                                        {
                                            role === "ADMIN"
                                                ? <Button
                                                    variant="contained"
                                                    onClick={(e) => history(ADMIN_ROUTE)}
                                                >
                                                    Админ панель
                                                </Button>
                                                : <div></div>
                                        }
                                        <Button
                                            variant="contained"
                                            onClick={(e) => history(BASKET_ROUTE)}
                                        >
                                            Мои фильмы
                                        </Button>
                                        <Button variant="contained"
                                                onClick={logOut}
                                        >
                                            Выйти
                                        </Button>
                                    </div>
                                    :
                                    <Button variant="contained"
                                            onClick={logIn}
                                    >
                                        Войти
                                    </Button>
                            }
                        </Stack>
                    </Toolbar>
                </Box>

            </Container>
        </AppBar>
    );
};

export default NavBar;