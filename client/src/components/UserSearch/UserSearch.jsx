import React, {useMemo, useState} from 'react';
import Input from "@mui/material/Input";
import {searchUser} from "../../http/userApi";
import UserSearchBox from "./UserSearchList/UserSearchBox";

const UserSearch = () => {
    const [search, setSearch] = useState(``);
    const [timerId, setTimerId] = useState(null);
    const [userList, setUserList] = useState([])
    const searchContent = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        clearTimeout(timerId);
    };

    useMemo(() => {
        if(search.length === 0) {
            setUserList([]);
            return
        }

        setTimerId(setTimeout(() => {
            searchUser(search)
                .then(data => {
                    setUserList(data)
                })
        }, 300));
    }, [search])

    return (
        <div>
            <div className={'search'}>
                <Input
                    className={`search`}
                    list="brow"
                    value={search}
                    placeholder={'search...'}
                    onChange={searchContent}
                    disableUnderline
                />
            </div>
            <div>
                {
                    userList.map((user) => {
                        return <UserSearchBox user={user}/>
                    })
                }
            </div>
        </div>
    );
};

export default UserSearch;