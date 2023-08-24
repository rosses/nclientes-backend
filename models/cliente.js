const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    id_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email_cliente: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password_cliente: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    verificado_cliente: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "Verificado vía email"
    },
    alta_cliente: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "Dado de alta por equipo de send cargo"
    },
    activo_cliente: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "Cliente habilitado para operar"
    },
    token_cliente: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    rol: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cliente',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
};
