const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedido', {
    id_pedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    timestamp_pedido: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    estado_pedido: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente',
        key: 'id_cliente'
      }
    },
    id_bodega: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bodega',
        key: 'id_bodega'
      }
    },
    gestionado_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    descuento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    estado_logistico: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pedido',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pedido" },
        ]
      },
      {
        name: "id_cliente_pedido_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
      {
        name: "id_bodega_pedido_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_bodega" },
        ]
      },
    ]
  });
};
