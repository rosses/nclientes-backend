const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asignacionCupon', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    correo_cliente: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    disponibles: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad_usos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_cupon: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'asignacionCupon',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
