import React, {useContext} from 'react';
import {Context} from "../index";
import UserSearch from "../components/UserSearch/UserSearch";

const Admin = () => {
    const {user} = useContext(Context);

    return (
        <div>
            <UserSearch/>
        </div>
    );
};

export default Admin;