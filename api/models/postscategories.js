module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {
    // postId: DataTypes.INTEGER,
    // categoryId: DataTypes.INTEGER,
  }, { timestamps: false });
  PostsCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return PostsCategories;
};
