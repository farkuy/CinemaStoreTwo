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

export const showInviteAcceptance = async (email) => {
    const {data} = await $authHost.get('api/user/showInviteAcceptance', {
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

