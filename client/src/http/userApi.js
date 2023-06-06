import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post(`api/user/registration`, {email, password, role: `ADMIN`});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post(`api/user/login`, {email, password});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)}

export const check = async () => {
    if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        const userInfo = jwtDecode(token)
        const {data} = await $authHost.get(`api/user/auth`);
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }

}
