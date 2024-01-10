import express from 'express'
import exphbs from 'express-handlebars';
import paymentRoutes from './routes/payment.routes.js';
import cors from 'cors'
const port = process.env.PORT || 3000
const deviceId = process.env.MP_DEVICE_SESSION_ID || ''
console.log(deviceId);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
app.use('/assets', express.static('./assets'));


app.use(paymentRoutes);

app.listen(port, () => {
    console.log('Server running on port 3000');
}).on('error', (err) => {
    console.log('Error', err);
});