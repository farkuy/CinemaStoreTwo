const path = require('path');

module.exports = {
    config: path.resolve('config', 'database.json'),
    'models-path': path.resolve('models'),
    'seeders-path': path.resolve('seeders'),
    'migrations-path': path.resolve('migrations')
};