var DataTypes = require("sequelize").DataTypes;
var _archivo = require("./archivo");
var _asignacionCupon = require("./asignacionCupon");
var _bodega = require("./bodega");
var _bulto = require("./bulto");
var _bulto_temporal = require("./bulto_temporal");
var _cliente = require("./cliente");
var _cliente_cupon = require("./cliente_cupon");
var _cliente_frecuente = require("./cliente_frecuente");
var _comercio = require("./comercio");
var _comuna = require("./comuna");
var _config = require("./config");
var _courier = require("./courier");
var _credito_cliente = require("./credito_cliente");
var _cupon = require("./cupon");
var _datos_comerciales = require("./datos_comerciales");
var _datos_contacto = require("./datos_contacto");
var _descuento = require("./descuento");
var _dscto_volumen = require("./dscto_volumen");
var _estado_bulto = require("./estado_bulto");
var _operador = require("./operador");
var _pago_pedido = require("./pago_pedido");
var _paquete = require("./paquete");
var _pedido = require("./pedido");
var _provincia = require("./provincia");
var _region = require("./region");
var _seccion = require("./seccion");
var _tarifario = require("./tarifario");
var _trazabilidad = require("./trazabilidad");

function initModels(sequelize) {
  var archivo = _archivo(sequelize, DataTypes);
  var asignacionCupon = _asignacionCupon(sequelize, DataTypes);
  var bodega = _bodega(sequelize, DataTypes);
  var bulto = _bulto(sequelize, DataTypes);
  var bulto_temporal = _bulto_temporal(sequelize, DataTypes);
  var cliente = _cliente(sequelize, DataTypes);
  var cliente_cupon = _cliente_cupon(sequelize, DataTypes);
  var cliente_frecuente = _cliente_frecuente(sequelize, DataTypes);
  var comercio = _comercio(sequelize, DataTypes);
  var comuna = _comuna(sequelize, DataTypes);
  var config = _config(sequelize, DataTypes);
  var courier = _courier(sequelize, DataTypes);
  var credito_cliente = _credito_cliente(sequelize, DataTypes);
  var cupon = _cupon(sequelize, DataTypes);
  var datos_comerciales = _datos_comerciales(sequelize, DataTypes);
  var datos_contacto = _datos_contacto(sequelize, DataTypes);
  var descuento = _descuento(sequelize, DataTypes);
  var dscto_volumen = _dscto_volumen(sequelize, DataTypes);
  var estado_bulto = _estado_bulto(sequelize, DataTypes);
  var operador = _operador(sequelize, DataTypes);
  var pago_pedido = _pago_pedido(sequelize, DataTypes);
  var paquete = _paquete(sequelize, DataTypes);
  var pedido = _pedido(sequelize, DataTypes);
  var provincia = _provincia(sequelize, DataTypes);
  var region = _region(sequelize, DataTypes);
  var seccion = _seccion(sequelize, DataTypes);
  var tarifario = _tarifario(sequelize, DataTypes);
  var trazabilidad = _trazabilidad(sequelize, DataTypes);

  cliente.belongsToMany(cupon, { as: 'id_cupon_cupons', through: cliente_cupon, foreignKey: "id_cliente", otherKey: "id_cupon" });
  cupon.belongsToMany(cliente, { as: 'id_cliente_clientes', through: cliente_cupon, foreignKey: "id_cupon", otherKey: "id_cliente" });
  bulto_temporal.belongsTo(archivo, { as: "id_archivo_archivo", foreignKey: "id_archivo"});
  archivo.hasMany(bulto_temporal, { as: "bulto_temporals", foreignKey: "id_archivo"});
  pedido.belongsTo(bodega, { as: "id_bodega_bodega", foreignKey: "id_bodega"});
  bodega.hasMany(pedido, { as: "pedidos", foreignKey: "id_bodega"});
  trazabilidad.belongsTo(bulto, { as: "id_bulto_bulto", foreignKey: "id_bulto"});
  bulto.hasMany(trazabilidad, { as: "trazabilidads", foreignKey: "id_bulto"});
  bodega.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(bodega, { as: "bodegas", foreignKey: "id_cliente"});
  cliente_cupon.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(cliente_cupon, { as: "cliente_cupons", foreignKey: "id_cliente"});
  credito_cliente.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(credito_cliente, { as: "credito_clientes", foreignKey: "id_cliente"});
  datos_comerciales.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(datos_comerciales, { as: "datos_comerciales", foreignKey: "id_cliente"});
  datos_contacto.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(datos_contacto, { as: "datos_contactos", foreignKey: "id_cliente"});
  descuento.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasOne(descuento, { as: "descuento", foreignKey: "id_cliente"});
  pedido.belongsTo(cliente, { as: "id_cliente_cliente", foreignKey: "id_cliente"});
  cliente.hasMany(pedido, { as: "pedidos", foreignKey: "id_cliente"});
  pago_pedido.belongsTo(comercio, { as: "id_comercio_comercio", foreignKey: "id_comercio"});
  comercio.hasMany(pago_pedido, { as: "pago_pedidos", foreignKey: "id_comercio"});
  bodega.belongsTo(comuna, { as: "id_comuna_comuna", foreignKey: "id_comuna"});
  comuna.hasMany(bodega, { as: "bodegas", foreignKey: "id_comuna"});
  bulto.belongsTo(comuna, { as: "id_comuna_comuna", foreignKey: "id_comuna"});
  comuna.hasMany(bulto, { as: "bultos", foreignKey: "id_comuna"});
  datos_comerciales.belongsTo(comuna, { as: "id_comuna_comuna", foreignKey: "id_comuna"});
  comuna.hasMany(datos_comerciales, { as: "datos_comerciales", foreignKey: "id_comuna"});
  operador.belongsTo(courier, { as: "id_courier_courier", foreignKey: "id_courier"});
  courier.hasMany(operador, { as: "operadors", foreignKey: "id_courier"});
  cliente_cupon.belongsTo(cupon, { as: "id_cupon_cupon", foreignKey: "id_cupon"});
  cupon.hasMany(cliente_cupon, { as: "cliente_cupons", foreignKey: "id_cupon"});
  trazabilidad.belongsTo(estado_bulto, { as: "id_estado_bulto_estado_bulto", foreignKey: "id_estado_bulto"});
  estado_bulto.hasMany(trazabilidad, { as: "trazabilidads", foreignKey: "id_estado_bulto"});
  trazabilidad.belongsTo(operador, { as: "id_operador_operador", foreignKey: "id_operador"});
  operador.hasMany(trazabilidad, { as: "trazabilidads", foreignKey: "id_operador"});
  bulto.belongsTo(paquete, { as: "id_paquete_paquete", foreignKey: "id_paquete"});
  paquete.hasMany(bulto, { as: "bultos", foreignKey: "id_paquete"});
  archivo.belongsTo(pedido, { as: "id_pedido_pedido", foreignKey: "id_pedido"});
  pedido.hasMany(archivo, { as: "archivos", foreignKey: "id_pedido"});
  bulto.belongsTo(pedido, { as: "id_pedido_pedido", foreignKey: "id_pedido"});
  pedido.hasMany(bulto, { as: "bultos", foreignKey: "id_pedido"});
  bulto_temporal.belongsTo(pedido, { as: "id_pedido_pedido", foreignKey: "id_pedido"});
  pedido.hasMany(bulto_temporal, { as: "bulto_temporals", foreignKey: "id_pedido"});
  cliente_cupon.belongsTo(pedido, { as: "id_pedido_pedido", foreignKey: "id_pedido"});
  pedido.hasMany(cliente_cupon, { as: "cliente_cupons", foreignKey: "id_pedido"});
  pago_pedido.belongsTo(pedido, { as: "id_pedido_pedido", foreignKey: "id_pedido"});
  pedido.hasMany(pago_pedido, { as: "pago_pedidos", foreignKey: "id_pedido"});
  comuna.belongsTo(provincia, { as: "id_provincia_provincium", foreignKey: "id_provincia"});
  provincia.hasMany(comuna, { as: "comunas", foreignKey: "id_provincia"});
  provincia.belongsTo(region, { as: "id_region_region", foreignKey: "id_region"});
  region.hasMany(provincia, { as: "provincia", foreignKey: "id_region"});
  operador.belongsTo(seccion, { as: "id_seccion_seccion", foreignKey: "id_seccion"});
  seccion.hasMany(operador, { as: "operadors", foreignKey: "id_seccion"});

  return {
    archivo,
    asignacionCupon,
    bodega,
    bulto,
    bulto_temporal,
    cliente,
    cliente_cupon,
    cliente_frecuente,
    comercio,
    comuna,
    config,
    courier,
    credito_cliente,
    cupon,
    datos_comerciales,
    datos_contacto,
    descuento,
    dscto_volumen,
    estado_bulto,
    operador,
    pago_pedido,
    paquete,
    pedido,
    provincia,
    region,
    seccion,
    tarifario,
    trazabilidad,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
