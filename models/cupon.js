const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cupon', {
    id_cupon: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo_cupon: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descripcion_cupon: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    porcentaje_cupon: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monto_cupon: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    disponibles_cupon: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timestamp_fin_cupon: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    activo_cupon: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cupon',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cupon" },
        ]
      },
    ]
  });
};
