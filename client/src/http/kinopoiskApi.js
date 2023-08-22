import {
    allGenresAndCountry,
    getFilmById, getYearAndGenre,
    mostAnticipatedMovies,
    top100PopularFilms,
    top250Films
} from "../utils/constsForApi";

const apiKey = '589a46d8-a49d-4219-9604-252b052367f5';
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

    async getVideo(id) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`, {
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

    async getCashFilm(id) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/box_office`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })
        const resp = await response.json();
        return resp;
    }

    async getMovieByGenre(idGenre, page) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${idGenre}&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })
        const resp = await response.json();
        return resp;
    }
    async getRelatedMovies(id) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })
        const resp = await response.json();
        return resp;
    }


    async getFilmInfo(id) {
        let trueId;
        if (typeof id === `string`) trueId = id.slice(1);
        else trueId = id;
        const response = await fetch(`${this.url}${trueId}`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })
        const resp = await response.json();
        return resp;
    }

    async getFilmInfoForBasket(id) {
        const response = await fetch(`${this.url}${id}`, {
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
    async getReleaseDateMovies(ageFrom, ageTo, page) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=${ageFrom}&yearTo=${ageTo}&page=${page}`, {
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

    async getReviews(id, page) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/reviews?page=${page}&order=DATE_DESC`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })
        const resp = await response.json();
        return resp;
    }
    async getPremiereList(year, month) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`, {
            headers: {
                "Content-Type": `application/json`,
                'X-API-KEY': apiKey
            }
        })
        const resp = await response.json();
        return resp;
    }
    async getReleases(year, month, page) {
        const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`, {
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
export const getСontentByTitle = new KinopoiskApiInfo(``, apiKey);
export const getGenre = new KinopoiskApiInfo(getYearAndGenre, apiKey);
export const getMovieByGenre = new KinopoiskApiInfo();
export const getRelatedMovies = new KinopoiskApiInfo();
export const getReleaseDateMovies = new KinopoiskApiInfo()
export const getReviews = new KinopoiskApiInfo();
export const miscellaneousInformation = new KinopoiskApiInfo();



