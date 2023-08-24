const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bodega', {
    id_bodega: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_bodega: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    calle_bodega: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    numero_bodega: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "Número de la calle"
    },
    detalle_bodega: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    principal_bodega: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    IsDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    DeleteDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    user_delete_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente',
        key: 'id_cliente'
      }
    },
    id_comuna: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comuna',
        key: 'id_comuna'
      }
    }
  }, {
    sequelize,
    tableName: 'bodega',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_bodega" },
        ]
      },
      {
        name: "id_cliente_bodega_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
      {
        name: "id_comuna_bodega_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_comuna" },
        ]
      },
    ]
  });
};
