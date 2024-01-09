import mercadopago from "mercadopago";

export const createOrder = async (req, res) => {

  mercadopago.configure({
    access_token: "TEST-4126178269442276-091922-88ba0af5d4fd92eebef62a6aabbc67c9-177829481",

    integrator_id: "dev_59a6893b595611ee980aaa6dfa4691a3"
  });

  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          id: 7698,
          title: req.body.title,
          description: `Dispositivo móvil de Tienda e-commerce`,
          picture_url: 'https://picsum.photos/200/300',
          quantity: +req.body.unit,
          currency_id: "ARS",
          unit_price: +req.body.price,
        },
      ],
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_141064751@testuser.com",
        phone: {
          area_code: "011",
          number: 1550111375
          },
        address: {
          street_name: "calle falsa",
          street_number: 123,
          zip_code: "1886"
        },
      },
      "back_urls": {
        success: 'https://supertraining-mp-commerce-nodejs.onrender.com/result',
        pending: 'https://supertraining-mp-commerce-nodejs.onrender.com/result',
        failure: 'https://supertraining-mp-commerce-nodejs.onrender.com/result',
      },
      notification_url: 'https://supertraining-mp-commerce-nodejs.onrender.com/webhook',
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
      external_reference: "test_user_831956901@testuser.com"

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