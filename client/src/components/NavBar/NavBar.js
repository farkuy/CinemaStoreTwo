import React, {useContext} from 'react';
import {Context} from "../../index";
import {AppBar, Button, Container, Stack, Toolbar, Typography} from "@mui/material";
import SearchCustom from "../Search/SearchCustom";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {CINEMA_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuth} from "../../toolkitRedux/userReducer";

const NavBar = () => {
    const {user} = useContext(Context);
    const history = useNavigate();

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.user.isAuth);

    const logIn = (e) => {
        e.preventDefault();
        dispatch(setIsAuth(true));
        history(LOGIN_ROUTE)
    }

    const logOut = (e) => {
        e.preventDefault();
        dispatch(setIsAuth(false));
        history(CINEMA_ROUTE)
    }

    return (
        <AppBar position={'relative'}>
            <Container fixed>
                <Toolbar>
                    <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        spacing={{ xs: 1, sm: 2, md: 45 }}
                    >
                        <NavLink to={CINEMA_ROUTE}>
                            <Typography variant={'h6'}>Cinema</Typography>
                        </NavLink>
                        <SearchCustom/>
                        {
                            isAuth
                                ? <div>
                                    <Button variant="contained">Админ панель</Button>
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
            </Container>
        </AppBar>
    );
};

export default NavBar;