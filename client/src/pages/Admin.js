import React, {useContext} from 'react';
import {Context} from "../index";
import UserSearch from "../components/UserSearch/UserSearch";
import {Button} from "@mui/material";
import {createGroup} from "../http/userApi";
import jwt_decode from "jwt-decode";

const Admin = () => {
    const {user} = useContext(Context);

    return (
        <div>
            <UserSearch/>
        </div>
    );
};

export default Admin;