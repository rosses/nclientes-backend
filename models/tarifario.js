const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tarifario', {
    id_comuna_origen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_comuna_destino: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mini: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    medium: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'tarifario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comuna_origen" },
          { name: "id_comuna_destino" },
        ]
      },
    ]
  });
};
