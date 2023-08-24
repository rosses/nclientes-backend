const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dscto_volumen', {
    cantidad_desde: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    porcentaje: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'dscto_volumen',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cantidad_desde" },
        ]
      },
    ]
  });
};
