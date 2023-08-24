const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datos_contacto', {
    id_datos_contacto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombres_datos_contacto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    apellidos_datos_contacto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    rut_datos_contacto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    telefono_datos_contacto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email_datos_contacto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente',
        key: 'id_cliente'
      }
    }
  }, {
    sequelize,
    tableName: 'datos_contacto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_datos_contacto" },
        ]
      },
      {
        name: "id_cliente_datos_contacto_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
};
