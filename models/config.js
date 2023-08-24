const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('config', {
    directiva: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    valor: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'config',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "directiva" },
        ]
      },
    ]
  });
};
