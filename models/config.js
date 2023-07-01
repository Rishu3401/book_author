const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Author', '', '', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Author = require('./Author')(sequelize, DataTypes);
db.Book = require('./Book')(sequelize, DataTypes);

db.Author.hasMany(db.Book, { foreignKey: 'AuthorName', onDelete: 'CASCADE' });
db.Book.belongsTo(db.Author, { foreignKey: 'AuthorName' });

db.sequelize.sync({ force: false });
module.exports = db;

