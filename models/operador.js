const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('operador', {
    id_operador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    identificador_operador: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password_operador: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    nombre_operador: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telefono_operador: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_seccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'seccion',
        key: 'id_seccion'
      }
    },
    id_courier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courier',
        key: 'id_courier'
      }
    }
  }, {
    sequelize,
    tableName: 'operador',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_operador" },
        ]
      },
      {
        name: "id_seccion_operador_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_seccion" },
        ]
      },
      {
        name: "id_courier_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_courier" },
        ]
      },
    ]
  });
};
