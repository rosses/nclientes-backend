const { Sequelize } = require("sequelize");
const {
  CylinderModel,
  UserModel,
  OrderModel,
  OrderDetailsModel,
} = require("../db");

const { Op } = require("sequelize");
async function 
runRPA(req, res) {
  try {

    let WSDL_WebDI = './wsdl/webdiv2.xml';
    let WSDL_CILDEF = './wsdl/cildef.xml';

    // Step 1: Get all orders pending of invoice and get invoice

    let orders = await OrderModel.findAll({
      where: { 
        status: 2,
        sapQuote: '',
        invoice: ''
      },
      include: [
        { model: UserModel, as: "createdByUser" }
      ]
    }); 
    
    const soap = require('strong-soap').soap;

 
    soap.createClient(WSDL_WebDI, { 
      endpoint: process.env.SAP_HOST+'/sap/bc/srt/rfc/sap/zweb_di_ws_v2/400/zweb_di_ws_v2/zweb_di_ws_v2' 
    }, async (err, client) => {
      if (err) { /*console.error(err); */return; }
      client.setSecurity(new soap.BasicAuthSecurity(process.env.SAP_USER, process.env.SAP_PASS));
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].createdByUser && orders[i].createdByUser.sapCode && orders[i].createdByUser.sapCode.length == 10) {
          let requestData = {
            IFecFin: orders[i].updatedAt.toISOString().substring(0,10),
            IFecIni: orders[i].createdAt.toISOString().substring(0,10),
            IKunnr: orders[i].createdByUser.sapCode,
            IFkart: 'ZFSD',
            TFactCab: [],
            TFactDet: []
          }; 
          await client.ZwebRfcTraeDatosFactura(requestData,async (err, result) => {
            if (err) {
              console.error(err);
              return;
            }   
            for (let j = 0; j < result.TFactCab.item.length; j++) {
              if (result.TFactCab.item[j].Pedido == orders[i].saleOrder) {
                if (result.TFactCab.item[j].Xblnr!='') {
                  orders[i].invoice = result.TFactCab.item[j].Xblnr;
                  await orders[i].save();
                }
                break;
              }
            }
          });
        }
      }

      // Find orders no emmited with invoice
      let orders2 = await OrderModel.findAll({
        where: { 
          status: 2,
          sapQuote: '',
          invoice: {
            [Op.ne]: ''
          }
        },
        include: [{ model: OrderDetailsModel, as: "OrderDetails", include: [{ model: CylinderModel, as: "Cylinder" }] }]
      });
      if (orders2.length > 0) {
        soap.createClient(WSDL_CILDEF, {
          endpoint: process.env.SAP_HOST+'/sap/bc/srt/rfc/sap/zrfc_cilindros_defectuosos/400/devolucion_cilindros_ws/devolucion_cilindros_ws'
        }, async (err2, client2) => {
          if (err2) { console.error(err2); return; }
          client2.setSecurity(new soap.BasicAuthSecurity(process.env.SAP_USER, process.env.SAP_PASS));         
          for (let i = 0; i < orders2.length; i++) {
            let materials = [];
            for (let j = 0; j < orders2[i].OrderDetails.length; j++) {
              let m = orders2[i].OrderDetails[j].Cylinder.material;
              let f = materials.findIndex(x => x.material == m );
              if (f==-1) {
                materials.push({
                  Material: m,
                  Cantidad: 1,
                  Posicion: (materials.length + 1) * 10,
                  Unidad: "ST"
                });
              }
              else {
                materials[f].quantity++;
              }
            }

            //console.log('ZCDF:' + orders2[i].orderId);

            let requestData = {
              IAuart: 'ZCDF',
              IGuia: orders2[i].orderId,
              IReferencia: orders2[i].invoice,
              TDevolucion: {item:materials},
              TReturn: []
            };
            //console.log(requestData);
            await client2.ZrfcCildefPedidoDevolucion(requestData,async (err, result) => {
              if (err) {
                console.error(err);
                return;
              }    
              orders2[i].sapQuote = result.EPedido;
              await orders2[i].save();

              console.log('print:' + result.EPedido);
              
              let requestData2 = {
                IPedido: result.EPedido,
                TReturn: []
              };

              await client2.ZrfcCildefLiberaPedido(requestData2,async (err2, result2) => {
                if (err2) {
                  console.error(err2);
                  return;
                }    
                orders2[i].memoOrder = result2.ENotaCredito;
                await orders2[i].save(); 
              });
            });
            break;
          }
 
        });
      }
    });
   
    res.send({ success: true });
  } catch (err) {
    //console.error(err);
    res.status(400).send({
      success: false,
      err: err
    });
  }
}

module.exports = {
  runRPA
};
