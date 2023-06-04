export default class ContentStore {
    constructor() {
        this._types = [
            {id: 1, name: `Экшен`, },
            {id: 2, name: `Коммедия`},
            {id: 3, name: `Драмма`},
            {id: 4, name: `Экшен`}
        ];
        this._brands = [
            {id: 1, name: `20th Century Fox`, },
            {id: 2, name: `Paramount Pictures`},
            {id: 1, name: `20th Century Fox`, },
            {id: 1, name: `20th Century Fox`, },

        ];
        this._content = [
            {id: 1, name: `Форест гамп`, },
            {id: 2, name: `Дед в пуле`}
        ]
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setContents(contents) {
        this._contents = contents
    }

    get types() {
        return  this._types
    }

    get brands() {
        return this._brands
    }
    get contents() {
        return this._contents
    }
}
