module.exports = (sequelize, Sequelize) => {
    const Route = sequelize.define("routes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      route: {
        type: Sequelize.STRING
      }
    });
  
    return Route;
  };