import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post(`api/user/registration`, {email, password, role: `ADMIN`});
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
