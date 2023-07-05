const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const BasketContent = sequelize.define('basket_content', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Content = sequelize.define('content', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false},
    name: {type: DataTypes.STRING, unique: true},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING},
});

const Genre = sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const MovieStudio = sequelize.define('movie_studio', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
});

const ContentInfo = sequelize.define('content_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
});

const GenreMovieStudio = sequelize.define('genre_movie_studio', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketContent);
BasketContent.belongsTo(Basket);

Genre.hasMany(Content);
Content.belongsTo(Genre);

MovieStudio.hasMany(Content);
Content.belongsTo(MovieStudio);

Content.hasMany(Rating);
Rating.belongsTo(Content);

Content.hasMany(BasketContent, {as: 'info'});
BasketContent.belongsTo(Content);

Genre.belongsToMany(MovieStudio, {through: GenreMovieStudio});
MovieStudio.belongsToMany(Genre, {through: GenreMovieStudio});

module.exports = {
    User,
    Basket,
    BasketContent,
    Content,
    Genre,
    MovieStudio,
    Rating,
    GenreMovieStudio,
    ContentInfo
}



