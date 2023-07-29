import {getGenre, getMovieByGenre, getReleaseDateMovies} from "../http/kinopoiskApi";

export function еimerEqualizer(min) {
    let h = `${Math.floor(min / 60)}`;
    let mm = min - (h * 60);
    mm = String(mm)
    if (h.length === 1) {
        h = `0${h}`;
    };
    if (mm.length === 1) {
        mm = `0${mm}`;
    }
    return `${h}:${mm}`
}

export async function getGenres() {
    let res = await getGenre.getAllGenresAndCountry();
    res = await res.genres;
    let genresFinish = await res.filter((genre) => {
        if (genre.genre !== '') {
            return true
        } else return false
    })
    genresFinish = await genresFinish.map((genre) => {
        return {
            name: genre.genre,
            route: `/genre${genre.id}`
        }
    })
    return genresFinish
}
export async function movieByGenre() {
    let res = await getGenre.getAllGenresAndCountry();
    res = await res.genres;

    let genreUrlObj = await res.filter((genre) => {
        if (genre.genre !== '') {
            return true
        } else return false
    });
    genreUrlObj = await genreUrlObj.map((genreObj) => {
        return {
            url: `/genre${genreObj.id}`,
            getApi: function (page){
                return getMovieByGenre.getMovieByGenre(genreObj.id, page)
            }
        }
    });

    return genreUrlObj;
}

export async function getReleaseDate(startYear) {
    let arrReleaseDate = [];
    let startDecade = startYear;
    let endDecade = startYear;

    while (endDecade % 10 !== 0) {
        endDecade += 1;
    }
    ;
    let firstDecade = {
        name: `С ${startDecade} по ${endDecade - 1}`,
        route: `/yearTo${startDecade}from${endDecade - 1}`,
        startDecade: startDecade,
        endDecade: endDecade,
    }
    arrReleaseDate.push(firstDecade);
    startDecade = endDecade

    while (endDecade <= 2000) {
        endDecade += 10;
        arrReleaseDate.push({
            name: `С ${startDecade} по ${endDecade - 1}`,
            route: `/yearTo${startDecade}from${endDecade - 1}`,
            startDecade: startDecade,
            endDecade: endDecade,
        })
        startDecade = endDecade;
    }

    while (endDecade <= new Date().getFullYear()) {
        arrReleaseDate.push({
            name: `${endDecade}`,
            route: `/yearTo${endDecade}from${endDecade}`,
            startDecade: endDecade,
            endDecade: endDecade,
        })
        ++endDecade;
    }

    arrReleaseDate = arrReleaseDate.reverse();
    return arrReleaseDate
}
export async function movieReleaseDate() {
    let res = await getReleaseDate(1895);
    let arrDate = res.map((year) => {
        return {
            url: `/yearTo${year.startDecade}from${year.endDecade}`,
            getApi: function (page) {
                return getReleaseDateMovies.getReleaseDateMovies(year.startDecade, year.endDecade, page)
            }
        }
    })
    return arrDate
}
