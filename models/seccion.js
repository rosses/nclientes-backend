const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seccion', {
    id_seccion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_seccion: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "Departamentos logísticos"
    }
  }, {
    sequelize,
    tableName: 'seccion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_seccion" },
        ]
      },
    ]
  });
};
