const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bulto', {
    id_bulto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_bulto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    direccion_bulto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefono_bulto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email_bulto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descripcion_bulto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    valor_declarado_bulto: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    precio_bulto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo_servicio_bulto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    codigo_bulto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    codigo_barras_bulto: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    id_paquete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'paquete',
        key: 'id_paquete'
      }
    },
    id_comuna: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comuna',
        key: 'id_comuna'
      }
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedido',
        key: 'id_pedido'
      }
    },
    rut_cliente: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    estado_logistico: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    track_spread: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
      comment: "Soft Delete bulto por pedido"
    },
    deletedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "responsable de eliminación de bulto"
    },
    largo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    alto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ancho: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bulto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_bulto" },
        ]
      },
      {
        name: "id_comuna_bulto_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_comuna" },
        ]
      },
      {
        name: "id_pedido_bulto_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_pedido" },
        ]
      },
      {
        name: "id_paquete_bulto_fk_idx",
        using: "BTREE",
        fields: [
          { name: "id_paquete" },
        ]
      },
    ]
  });
};
