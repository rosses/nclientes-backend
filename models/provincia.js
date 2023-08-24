const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('provincia', {
    id_provincia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_provincia: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_region: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'region',
        key: 'id_region'
      }
    }
  }, {
    sequelize,
    tableName: 'provincia',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_provincia" },
        ]
      },
      {
        name: "id_region_provincia_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_region" },
        ]
      },
    ]
  });
};
