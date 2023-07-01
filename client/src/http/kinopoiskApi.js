import {
    allGenresAndCountry,
    getFilmById,
    mostAnticipatedMovies,
    top100PopularFilms,
    top250Films
} from "../utils/constsForApi";

const apiKey = 'da54e60b-6df3-487b-99d2-a16d293f1eae';
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

    async getMostAnticipatedMovies(page) {
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
        const trueId = id.slice(1)
        const response = await fetch(`${this.url}${trueId}`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })

        const resp = await response.json();
        return resp;
    }

    async getAllGenresAndCountry() {
        const response = await fetch(`${this.url}`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })

        const resp = await response.json();
        return resp;
    }
    async getСontentByTitle(name, page) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&keyword=${name}&page=${page}`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })

        const resp = await response.json();
        return resp;
    }
    async getSequelPrequel(id) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/sequels_and_prequels`, {
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
export const getMostAnticipatedMovies = new KinopoiskApiInfo(mostAnticipatedMovies, apiKey);
export const getMovieById = new KinopoiskApiInfo(getFilmById, apiKey);
export const maineInfoAboutContent = new KinopoiskApiInfo(allGenresAndCountry, apiKey);
export const getСontentByTitle = new KinopoiskApiInfo(``, apiKey)


