import React, {useContext, useState} from 'react';
import { TextField, Button } from '@mui/material';
import {Link, useNavigate} from "react-router-dom"
import './AuthStyle.css'
import {check, login, registration} from "../../http/userApi";
import {Context} from "../../index";
import {CINEMA_ROUTE} from "../../utils/consts";

const Auth = () => {
    const [showModal, setShowModal] = useState(`dm-overlay-active`);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authOrRegistration, setAuthOrRegistration] = useState(`logIn`)
    const {user} = useContext(Context);
    const history = useNavigate();

    const signIn = async (e) => {
        try {
            if (authOrRegistration === 'logIn') {
                await login(email, password);
            } else {
                await registration(email, password);
            }
            user.setUser(user);
            user.setIsAuth(true);
            history(CINEMA_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(email, password)
    };


    return (
        <div className={`dm-overlay ${showModal}`}  id="win1">
            <div className="dm-table">
                <div className="dm-cell">
                    <div className="dm-modal">
                        <React.Fragment>
                            <br/>
                            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                                <TextField
                                    type="login"
                                    variant='outlined'
                                    color='secondary'
                                    label="Email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    fullWidth
                                    required
                                    sx={{mb: 4}}
                                />
                                <TextField
                                    type="password"
                                    variant='outlined'
                                    color='secondary'
                                    label="Password"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    fullWidth
                                    sx={{mb: 4}}
                                />
                                {
                                    authOrRegistration == "logIn"
                                    ? <Button onClick={signIn} variant="outlined" color="secondary" type="submit">Log in</Button>
                                    : <Button onClick={signIn} variant="outlined" color="secondary" type="submit">Register</Button>
                                }
                            </form>
                            {
                                authOrRegistration == "logIn"
                                ? <small>Already have an account? <strong onClick={(e) => setAuthOrRegistration(`registration`)}>Registration Here</strong></small>
                                : <small>Already have an account? <strong onClick={(e) => setAuthOrRegistration(`logIn`)}>Log in Here</strong></small>
                            }
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;