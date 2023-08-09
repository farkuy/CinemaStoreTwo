import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post(`api/user/registration`, {email, password, role: `USER`});
    localStorage.setItem('token', data.token)
    localStorage.setItem('userEmail', jwt_decode(data.token).email)
    localStorage.setItem('userId', jwt_decode(data.token).id)
    console.log(jwt_decode(data.token))
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post(`api/user/login`, {email, password});
    localStorage.setItem('token', data.token)
    localStorage.setItem('userEmail', jwt_decode(data.token).email)
    localStorage.setItem('userId', jwt_decode(data.token).id)
    console.log(jwt_decode(data.token))
    return jwt_decode(data.token)}

export const requestAddNewAdmin = async (id) => {
    const {data} = await $host.post(`api/user/requestAddNewAdmin`, { id });
    return data;
}

export const inviteToAGroup = async (adminId, groupName, userName, userId) => {
    const {data} = await $host.post(`api/user/inviteToAGroup`, { adminId, groupName, userName});
    return data;
}

export const createGroup = async (adminId, groupName) => {
    const {data} = await $host.post(`api/user/createNewGroup`, { adminId, groupName });
    return data;
}

export const showInviteAcceptance = async (email) => {
    const {data} = await $authHost.get('api/user/showInviteAcceptance', {
        params: { email },
    });
    return data
}

export const showInviteGroup = async (email) => {
    const {data} = await $authHost.get('api/user/showInviteGroup', {
        params: { email },
    });
    return data
}

export const acceptInvitation = async (email) => {
    const {data} = await $authHost.get('api/user/acceptTheInvitation', {
        params: { email },
    });
    return data
}

export const acceptInvitationGroup = async (groupName, userName) => {
    const {data} = await $host.post('api/user/acceptTheInvitationToAGroup', {groupName, userName});
    return data
}

export const addReview = async (filmId, userName, textReview, userId, h1, appraisal) => {
    const {data} = await $host.post('api/user/addReview', {
        filmId,
        userName,
        textReview,
        userId,
        h1,
        appraisal
    });
    return data
}

export const editReview = async (filmId, userName, textReview, userId, h1, appraisal) => {
    const {data} = await $host.post('api/user/editReview', {
        filmId,
        userName,
        textReview,
        userId,
        h1,
        appraisal
    });
    return data
}


export const checkReview = async (filmId, userName, userId) => {
    const {data} = await $authHost.get(`api/user/checkReview`, {
        params: { filmId, userName, userId },
    });
    return data
}

export const setNameListFunc = async (route, typeName, listNames) => {
    const {data} = await $host.post(`api/genre/setNameList`, {
        route,
        typeName,
        listNames
    });
    return data
}

export const getNameList = async (route, typeName) => {
    const {data} = await $host.post(`api/genre/getNameList`, {
        route,
        typeName,
    });
    return data
}

export const showAllFilmReviews = async (userId, filmId) => {
    const {data} = await $authHost.get(`api/review/showAllFilmReview`, {
        params: { userId, filmId },
    });
    return data
}

export const deleteUserReview = async (userId, filmId) => {
    const {data} = await $authHost.delete(`api/review/deleteUserReview`, {
        params: { userId, filmId },
    });
    return data
}

export const check = async (email) => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userEmail')
    if (token && name) {
        const {data} = await $authHost.get(`api/user/auth`, {
            params: { email },
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', jwt_decode(data.token).id)
        console.log(jwt_decode(data.token))
        return jwt_decode(data.token)
    }
}

export const searchUser = async (email) => {
    const {data} = await $authHost.get('api/user/searchUser', {
        params: { email },
    })
    return data;
}

