import {$authHost, $host} from "./index";

export const addContentBasket = async (userId, contentId, contentInfo) => {
    const {data} = await $host.post(`api/content/addBasketContent`, {userId, contentId, contentInfo});
    return data;
};

export const deleteContentBasket = async (basketContentId, userId) => {
    const {data} = await $host.delete(`api/content/delBasketContent`, {
        params: {basketContentId, userId},
    });
    return data;
}

export const showUserBasket = async (userId) => {
    const {data} = await $authHost.get(`api/content/getUserBasket`, {
        params: { userId },
    });
    return data;
}