import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Routes/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {useDispatch} from "react-redux";
import {setIsAuth} from "./toolkitRedux/userReducer";
import {CircularProgress} from "@mui/material";
import {check} from "./http/userApi";
import './/Styles/App.css';
import jwtDecode from "jwt-decode";

function App() {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            check()
                .then(data => {
                    dispatch(setIsAuth(true));
                    user.setIsAuth(true);
                    user.setUser(jwtDecode(token))
                    setLoading(false)
                })
            ;
        } else {
            dispatch(setIsAuth(false));
            user.setIsAuth(false);
            user.setUser({})
            setLoading(false)
        }
            console.log(user)
    }, []);


    if (loading) {
        return <CircularProgress className={'CircularProgress'} />
    }

  return (
    <BrowserRouter className="App">
        <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
