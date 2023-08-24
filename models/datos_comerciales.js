const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datos_comerciales', {
    id_datos_comerciales: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_fantasia_datos_comerciales: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    rut_datos_comerciales: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    razon_social_datos_comerciales: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    telefono_datos_comerciales: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    calle_datos_comerciales: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    numero_datos_comerciales: {
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
    tableName: 'datos_comerciales',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_datos_comerciales" },
        ]
      },
      {
        name: "id_cliente_datos_comerciales_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
      {
        name: "id_comuna_datos_comerciales_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_comuna" },
        ]
      },
    ]
  });
};
