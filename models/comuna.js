const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comuna', {
    id_comuna: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_comuna: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    carril_comuna: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "Si carril=0 no activado"
    },
    id_provincia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'provincia',
        key: 'id_provincia'
      }
    },
    despacho: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comuna',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comuna" },
        ]
      },
      {
        name: "id_provincia_comuna_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_provincia" },
        ]
      },
    ]
  });
};
