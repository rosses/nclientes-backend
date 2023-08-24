const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bulto_temporal', {
    id_bulto_temporal: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    json_bulto_temporal: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    json_error: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_archivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'archivo',
        key: 'id_archivo'
      }
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
    tableName: 'bulto_temporal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_bulto_temporal" },
        ]
      },
      {
        name: "id_archivo_bulto_temporal_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_archivo" },
        ]
      },
      {
        name: "id_pedido_bulto_temporal_idx",
        using: "BTREE",
        fields: [
          { name: "id_pedido" },
        ]
      },
    ]
  });
};
