import { Router } from "express";
import { createOrder, receiveWebhook, result } from "../controllers/payment.controllers.js";

const router = Router();

router.get('/', function (req, res) {
  res.render('home');
});

router.get('/detail', function (req, res) {
  res.render('detail', req.query);
});

router.post('/create-order', createOrder);

router.post('/webhook', receiveWebhook);

router.get('/result', result);

export default router;