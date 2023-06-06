import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {useDispatch} from "react-redux";
import {setIsAuth} from "./toolkitRedux/userReducer";
import {CircularProgress} from "@mui/material";
import {check} from "./http/userApi";
import './/Styles/App.css'
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
                    setLoading(false)
                })
            ;
        } else {
            dispatch(setIsAuth(false));
            user.setIsAuth(false);
            setLoading(false)
        }
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
