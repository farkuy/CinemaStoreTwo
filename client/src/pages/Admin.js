import React, {useContext} from 'react';
import {Context} from "../index";
import UserSearch from "../components/UserSearch/UserSearch";
import {Button} from "@mui/material";
import {createGroup} from "../http/userApi";
import jwt_decode from "jwt-decode";

const Admin = () => {
    const {user} = useContext(Context);

    const createNewGroup = async (e) => {
        e.preventDefault();

        if (user) {
            await createGroup(user.id, `тры`)
                .then(data => {
                    console.log(data)
                })
        }
    }

    return (
        <div>
            <UserSearch/>
            <Button
                onClick={createNewGroup}
            >
                Создать новую группу
            </Button>
        </div>
    );
};

export default Admin;