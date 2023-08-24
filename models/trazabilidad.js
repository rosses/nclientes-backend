const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trazabilidad', {
    id_trazabilidad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_bulto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bulto',
        key: 'id_bulto'
      }
    },
    id_estado_bulto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estado_bulto',
        key: 'id_estado_bulto'
      }
    },
    id_operador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'operador',
        key: 'id_operador'
      }
    },
    timestamp_trazabilidad: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'trazabilidad',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_trazabilidad" },
        ]
      },
      {
        name: "id_bulto_trazabilidad_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_bulto" },
        ]
      },
      {
        name: "id_estado_bulto_trazabilidad_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_estado_bulto" },
        ]
      },
      {
        name: "id_operador_trazabilidad_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_operador" },
        ]
      },
    ]
  });
};
