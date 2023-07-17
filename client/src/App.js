import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Routes/AppRouter";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {CircularProgress} from "@mui/material";
import {check} from "./http/userApi";
import './/Styles/App.css';
import NavBar from "./components/NavBar/NavBar";

function App() {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            const email = localStorage.getItem('userEmail');
            check(email).then(data => {
                user.setIsAuth(true)
                user.setUser(true)
            }).finally(() => setLoading(false))
        } else {
            user.setIsAuth(false);
            user.setUser({});
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
