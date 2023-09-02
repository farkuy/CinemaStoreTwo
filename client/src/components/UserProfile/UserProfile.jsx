import React, {useContext, useMemo, useState} from 'react';
import jwt_decode from "jwt-decode";
import {acceptInvitation, acceptInvitationGroup, showInviteAcceptance, showInviteGroup} from "../../http/userApi";
import {Button, Card, CardContent, MenuItem, Typography} from "@mui/material";
import {Context} from "../../index";
import {BASKET_ROUTE} from "../../Routes/consts";
import {useNavigate} from "react-router-dom";
import Basket from "../../pages/Basket";

const UserProfile = () => {

    const {user} = useContext(Context);
    const [invitationGroups, setInvitationGroups] = useState([]);
    const [invitationMessage, setInvitationMessage] = useState('Нет действующих приглашений стать администратором');
    const history = useNavigate();

    useMemo(() => {
        let profile = localStorage.getItem('token');
        if (profile) {
            profile = jwt_decode(profile);
            const email = profile.email;
            showInviteAcceptance(email)
                .then(data => {
                    setInvitationMessage(data)
                })
            showInviteGroup(email)
                .then(data => {
                    console.log(data)
                    setInvitationGroups(data)
                })
        }
    }, [])
    const acceptTheInvitationGroup = async (e, groupName) => {
        e.preventDefault();
        let user = localStorage.getItem('token')
        if(user) {
            user = jwt_decode(user);
            const email = user.email;
            console.log(email)
            await acceptInvitationGroup(groupName, email)
                .then(data => {
                    console.log(data)
                    setInvitationMessage('Нет действующих приглашений стать администратором')
                })
        }
    }

    const acceptTheInvitation = async (e) => {
        e.preventDefault();
        let user = localStorage.getItem('token')
        if(user) {
            user = jwt_decode(user);
            const email = user.email;
            await acceptInvitation(email)
                .then(data => {
                    console.log(data);
                    setInvitationMessage('Нет действующих приглашений стать администратором')
                })
        }
    }

    return (
        <div>
            {
                invitationMessage === 'Нет действующих приглашений стать администратором'
                ? <div>'Нет действующих приглашений стать администратором'</div>
                :    <Card
                        style={{background:`linear-gradient(to right, #FFD700, #FFA500)`}}
                        sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            </Typography>
                            <Typography variant="h5" component="div">
                                {invitationMessage}
                            </Typography>
                            <Typography variant="body2">
                                <Button
                                    onClick={acceptTheInvitation}
                                >
                                    Стать администратором
                                </Button>
                                <Button
                                    color="error"
                                >
                                    Отказаться
                                </Button>
                            </Typography>

                        </CardContent>
                    </Card>
            }
            <Basket/>
        </div>
    );
};

export default UserProfile;