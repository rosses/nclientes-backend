const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courier', {
    id_courier: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_courier: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "Partners sendcargo"
    }
  }, {
    sequelize,
    tableName: 'courier',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_courier" },
        ]
      },
    ]
  });
};
