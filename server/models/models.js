const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});


const GrroupBB = sequelize.define('grpss', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    adminId: { type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false },
    users: { type: DataTypes.ARRAY(DataTypes.JSONB), defaultValue: [] },
    groupName: {type: DataTypes.STRING, unique: true},
})

const ContentListNames = sequelize.define('contentListNameV', {
    routeName: {type: DataTypes.STRING},
    typeName: {type: DataTypes.STRING},
    listRoue: {type: DataTypes.STRING},
})

const Video = sequelize.define('video', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type: DataTypes.STRING, primaryKey: true},
    duration: {type: DataTypes.INTEGER},
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type: DataTypes.STRING},
    userName: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING},
    date: {type: DataTypes.STRING},
    timecodeList: {type: DataTypes.ARRAY(DataTypes.JSONB), defaultValue: []},
})

const InviteToAGroups = sequelize.define('inviteToAGroupps', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: {type: DataTypes.STRING},
    groupName: {type: DataTypes.STRING},
})

const BecomeAnAdministrator = sequelize.define('becomeAnAdministrator', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: {type: DataTypes.STRING, unique: true,},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const BasketContent = sequelize.define('basket_content', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: { type: DataTypes.STRING },
    filmId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
    userName: { type: DataTypes.STRING },
    appraisal: { type: DataTypes.STRING},
    h1: { type: DataTypes.STRING }
})

const Content = sequelize.define('content', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    nameRu: { type: DataTypes.STRING, unique: true },
    nameEn: { type: DataTypes.STRING, unique: true },
    posterUrl: { type: DataTypes.STRING },
    posterUrlPreview: { type: DataTypes.STRING },
    filmId: { type: DataTypes.INTEGER },
    year: { type: DataTypes.STRING },
    genres: { type: DataTypes.JSONB },
    countries: { type: DataTypes.JSONB },
    rating: { type: DataTypes.STRING },
    ratingVoteCount: { type: DataTypes.INTEGER },
    ratingChange: { type: DataTypes.STRING },
    filmLength: { type: DataTypes.STRING }
});

const Contents = sequelize.define('contents', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
    nameRu: { type: DataTypes.STRING, unique: true },
    nameEn: { type: DataTypes.STRING, unique: true },
    posterUrl: { type: DataTypes.STRING },
    posterUrlPreview: { type: DataTypes.STRING },
    filmId: { type: DataTypes.INTEGER },
    year: { type: DataTypes.STRING },
    genres: { type: DataTypes.JSONB },
    countries: { type: DataTypes.JSONB },
    rating: { type: DataTypes.STRING },
    ratingVoteCount: { type: DataTypes.INTEGER },
    ratingChange: { type: DataTypes.STRING },
    filmLength: { type: DataTypes.STRING }
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

User.hasMany(GrroupBB);
GrroupBB.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Video.hasMany(Comment);
Comment.belongsTo(Video);

User.hasMany(InviteToAGroups, {as: 'info'});
InviteToAGroups.belongsTo(User);

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

Contents.hasMany(BasketContent, {as: 'info'});
BasketContent.belongsTo(Contents);

Genre.belongsToMany(MovieStudio, {through: GenreMovieStudio});
MovieStudio.belongsToMany(Genre, {through: GenreMovieStudio});

module.exports = {
    User,
    GrroupBB,
    Comment,
    Video,
    ContentListNames,
    Review,
    InviteToAGroups,
    Basket,
    BasketContent,
    Content,
    Contents,
    Genre,
    MovieStudio,
    Rating,
    GenreMovieStudio,
    ContentInfo,
    BecomeAnAdministrator,
}



