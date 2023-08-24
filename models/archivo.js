const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('archivo', {
    id_archivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_archivo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ruta_archivo: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    procesado_archivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedido',
        key: 'id_pedido'
      }
    }
  }, {
    sequelize,
    tableName: 'archivo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_archivo" },
        ]
      },
      {
        name: "id_pedido_archivo_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_pedido" },
        ]
      },
    ]
  });
};
