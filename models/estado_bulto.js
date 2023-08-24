const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estado_bulto', {
    id_estado_bulto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_estado_bulto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descripcion_estado_bulto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mensaje_email_estado_bulto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mensaje_sms_estado_bulto: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'estado_bulto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_estado_bulto" },
        ]
      },
    ]
  });
};
