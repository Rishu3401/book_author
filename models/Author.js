module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    AuthorName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    DateOfBirth: {
      type: DataTypes.DATE
    },
    Country: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'Author',
    timestamps: false
  });

  Author.associate = (models) => {
    Author.hasMany(models.Book, {
      foreignKey: 'AuthorName',
      onDelete: 'CASCADE'
    });
  };

  return Author;
};


