import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {
    Divider, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    SwipeableDrawer
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE, CARTOON_ROUTE,
    CINEMA_ROUTE,
    FILM_SELECTION_ROUTE, GENRE_FILMS_SELECTION_ROUTE,
    LOGIN_ROUTE, SERIAL_ROUTE,
    START_ROUTE
} from "../../Routes/consts";
import {Context} from "../../index";
import jwtDecode from "jwt-decode";


const BurgerMenu = () => {
    const {user} = useContext(Context);
    const [role, setRole] = useState('');
    const [id, setId] = useState(-1);

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [typeList, setTypeList] = useState([
        ['Films', CINEMA_ROUTE + FILM_SELECTION_ROUTE],
        ['Serial', SERIAL_ROUTE + GENRE_FILMS_SELECTION_ROUTE],
    ]);
    const history = useNavigate();

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

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


    useEffect(() => {
        const user = localStorage.getItem('token');
        if (user) {
            const roleUser = jwtDecode(user).role
            setRole(roleUser)
            const id = jwtDecode(user).id;
            setId(id)
        }
    }, [user.user.role])

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {typeList.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => history(text[1])}
                        >
                            <ListItemText primary={text[0]} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {
                window.innerWidth > 527
                ? <div></div>
                :  user.isAuth
                        ? <div style={{display: "flex", flexDirection: 'column'}}>
                            {
                                role === "ADMIN"
                                    ?
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={(e) => history(ADMIN_ROUTE)}
                                        >
                                            <ListItemText primary={'Админ панель'} />
                                        </ListItemButton>
                                    </ListItem>
                                    : <div></div>
                            }
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={(e) => history(BASKET_ROUTE)}
                                >
                                    <ListItemText primary={'Мои фильмы'} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={logOut}
                                >
                                    <ListItemText primary={'Выйти'} />
                                </ListItemButton>
                            </ListItem>
                        </div>
                        :
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={logIn}
                            >
                                <ListItemText primary={'Войти'} />
                            </ListItemButton>
                        </ListItem>
            }
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <MenuIcon
                        />
                    </IconButton>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
};

export default BurgerMenu;