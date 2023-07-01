module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    BookID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    Title: {
      type: DataTypes.STRING
    },
    AuthorName: {
      type: DataTypes.STRING
    },
    PublicationYear: {
      type: DataTypes.INTEGER
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {
    tableName: 'Book',
    timestamps: false
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: 'AuthorName',
      onDelete: 'CASCADE'
    });
  };

  return Book;
};


