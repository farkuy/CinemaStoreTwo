export class standardContentInfo {
    constructor(obj) {
        this._nameRu = obj.nameRu;
        this._nameOriginal = obj.nameOriginal;
        this._genres = obj.genres
        this._kinopoiskId = obj.kinopoiskId;
        this._ratingKinopoisk = obj.ratingKinopoisk;
        this._year = obj.year;
        this._countries = obj.countries;
        this._type = obj.type;
        this._posterUrl = obj.posterUrl;
        this._posterUrlPreview = obj.posterUrlPreview
    }

    get nameRu() {
        return this._nameRu
    }
    get nameOriginal() {
        return this._nameOriginal
    }
    get kinopoiskId() {
        return this._kinopoiskId
    }
    get genres() {
        return this._genres
    }
    get ratingKinopoisk() {
        return this._ratingKinopoisk
    }
    get year() {
        return this._year
    }
    get countries() {
        return this._countries
    }
    get type() {
        return this._type
    }
    get posterUrl() {
        return this._posterUrl
    }
    get posterUrlPreview() {
        return this._posterUrlPreview
    }
}