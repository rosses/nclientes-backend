const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago_pedido', {
    id_pago_pedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedido',
        key: 'id_pedido'
      }
    },
    timestamp_pago_pedido: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "Tiempo en que se paso a la pasarela"
    },
    importe_pago_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Costo del pedido en el momento de la solicitud"
    },
    codigo_transaccion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    informacion_pago_pedido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_comercio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comercio',
        key: 'id_comercio'
      }
    }
  }, {
    sequelize,
    tableName: 'pago_pedido',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pago_pedido" },
        ]
      },
      {
        name: "id_pedido_pago_pedido_idx",
        using: "BTREE",
        fields: [
          { name: "id_pedido" },
        ]
      },
      {
        name: "id_comercio_pago_pedido_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_comercio" },
        ]
      },
    ]
  });
};
