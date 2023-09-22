import mercadopago from "mercadopago";

export const createOrder = async (req, res) => {

  mercadopago.configure({
    access_token: "APP_USR-8709825494258279-092911-227a84b3ec8d8b30fff364888abeb67a-1160706432",
    integrator_id: "dev_24c65fb163bf11ea96500242ac130004"
  });

  try {
    const result = await mercadopago.preferences.create({
      items: [
        {

          id: 7698,
          title: req.body.title,
          description: `Dispositivo móvil de Tienda e-commerce`,
          picture_url: req.body.img,
          quantity: +req.body.unit,
          currency_id: "ARS",
          unit_price: +req.body.price,
        },
      ],
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_36961754@testuser.com",
        phone: { Celular: "1150111375" },
        address: { direccion: "calle falsa 123", cp: 1886 },
      },
      "back_urls": {
        success: 'http://localhost:3000/result',
        pending: 'http://localhost:3000/result',
        failure: 'http://localhost:3000/result',
      },
      notification_url: 'https://41dc-186-12-170-97.ngrok.io/webhook',
      "payment_methods": {
        "excluded_payment_methods": [
          {
            id: "visa"
          }
        ],
        "excluded_payment_types": [
          {}
        ],
        installments: 6
      },
      auto_return: "all",
      external_reference: "maranga_matias@hotmail.com"

    })
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
}

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    console.log('WebHook received!');
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment[ "data.id" ]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const result = (req, res) => {
  try {
    let status, collection_id, payment_id, payment_type, external_reference, merchant_order_id, preference_id;

    switch (req.query.status) {
      case 'approved':
        status = req.query.status;
        collection_id = req.query.collection_id;
        payment_id = req.query.payment_id;
        external_reference = req.query.external_reference;
        payment_type = req.query.payment_type;
        merchant_order_id = req.query.merchant_order_id;
        preference_id = req.query.preference_id;
        break;
      case 'pending':
        status = req.query.status;
        collection_id = req.query.collection_id;
        payment_id = req.query.payment_id;
        external_reference = req.query.external_reference;
        payment_type = req.query.payment_type;
        merchant_order_id = req.query.merchant_order_id;
        preference_id = req.query.preference_id;
        break;
      default:
        status = req.query.status;
        collection_id = req.query.collection_id;
        payment_id = req.query.payment_id;
        external_reference = req.query.external_reference;
        payment_type = req.query.payment_type;
        merchant_order_id = req.query.merchant_order_id;
        preference_id = req.query.preference_id;
        break;
    }
    res.json({
      status: status,
      collection_id: collection_id,
      payment_id: payment_id,
      external_reference: external_reference,
      payment_type: payment_type,
      merchant_order_id: merchant_order_id,
      preference_id: preference_id
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" })
  }
}