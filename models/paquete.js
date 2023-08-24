const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paquete', {
    id_paquete: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_paquete: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descripcion_paquete: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    alto_paquete: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ancho_paquete: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    largo_paquete: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_comunal_paquete: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_regional_paquete: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tolerancia_paquete: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'paquete',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_paquete" },
        ]
      },
    ]
  });
};
