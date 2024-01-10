import { useState } from 'react';
import './App.css';
function App() {
  const [quantity, setQuantity] = useState(0);
  const [mercadopagoFrame, setMercadopagoFrame] = useState('');

  const stringQuantity = JSON.stringify(quantity);
  const uuid = window.crypto.randomUUID();

  const products = [
    {
      id: uuid,
      title: 'Samsung Galaxy S9',
      description: `Dispositivo móvil de Tienda e-commerce`,
      picture_url:
        'https://res.cloudinary.com/marangadev/image/upload/v1704813879/samsung-galaxy-s9-xxl_w9bvzu.jpg',
      quantity: stringQuantity,
      currency_id: 'ARS',
      unit_price: '10000',
    },
  ];

  const buyItem = async ({ title, price, unit, img }) => {
    const res = await fetch('https://supertraining-mp-commerce-nodejs.onrender.com/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price, unit, img }),
    });
    console.log(res);
    const data = await res.json();
    setMercadopagoFrame(data.body.init_point);
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh' }}>
      {products.map((product) => (
        <div
          className='card'
          style={{ width: '18rem' }}
          key={window.crypto.randomUUID()}>
          <img
            src={product.picture_url}
            className='card-img-top'
            alt='...'
          />

          <div className='card-body'>
            <h5 className='card-title'>{product.title}</h5>
            <p className='card-text'>{product.description}</p>
            <p>{product.unit_price}</p>
            <div>
              <button
                className='btn'
                onClick={() => setQuantity((prev) => prev - 1)}>
                -
              </button>
              <span>{quantity}</span>
              <button
                className='btn'
                onClick={() => setQuantity((prev) => prev + 1)}>
                +
              </button>
            </div>
            <button
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#staticBackdrop'
              onClick={() => buyItem(product)}>
              comprar
            </button>
          </div>
        </div>
      ))}

      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
          <div className='modal-content h-100'>
            <div className='modal-body h-100'>
              <iframe
                src={mercadopagoFrame}
                className='w-100 h-100'
                frameBorder='0'
                id='mercadopago-frame'></iframe>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
