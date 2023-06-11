import {getFilmById, top100PopularFilms, top250Films} from "../utils/constsForApi";

const apiKey = '80eb4d7c-151a-4371-8c72-3a3796eedc44';
class KinopoiskApiInfo {
    constructor(url, key) {
        this.url = url;
        this.key = key;
    }
    async getTop(page) {
        const response = await fetch(`${this.url}${page}`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })

        const resp = await response.json();
        return resp;
    }
    async getFilmInfo(id) {
        const response = await fetch(`${this.url}${id}`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })

        const resp = await response.json();
        return resp;
    }
}

export const getTop250Movies = new KinopoiskApiInfo(top250Films, apiKey);
export const getTop100PopularFilms = new KinopoiskApiInfo(top100PopularFilms, apiKey);
export const getMovieById = new KinopoiskApiInfo(getFilmById, apiKey);


