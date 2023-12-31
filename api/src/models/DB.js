const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('serie', { //series
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false,
    },
    atp: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    state: {
      type: DataTypes.ENUM("ACTIVO" , "ANULADO"),
      allowNull: false,
      defaultValue: "ACTIVO"
    }
  });
  
};
