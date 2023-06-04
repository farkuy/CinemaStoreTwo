import React, {useState} from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from "react-router-dom"
import './AuthStyle.css'


const Auth = () => {
    const [showModal, setShowModal] = useState(`dm-overlay-active`)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        console.log(email, password)
    }

    const registration = (e) => {
        e.preventDefault();
        setShowModal('')
    }

    return (
        <div className={`dm-overlay ${showModal}`}  id="win1">
            <div className="dm-table">
                <div className="dm-cell">
                    <div className="dm-modal">
                        <React.Fragment>
                            <br/>
                            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                                <TextField
                                    type="email"
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
                                <Button onClick={registration} variant="outlined" color="secondary" type="submit">Register</Button>
                            </form>
                            <small>Already have an account? <Link to="/login">Login Here</Link></small>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;