import { Router, Request, Response } from "express";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51LOeVQEuYDk3LNJoUMW12VAK1QrKdDXqI6TsXxWBJCtxSrzNXGubevjffVDCk4aSwFEzQQnKb4fwPIxaAQOazXTc00xh2AipPi");

const router: Router = Router();
router.post("/payment", (req: Request, res: Response) => {
  stripe.customers.create({
    email: req.body.email,
    source: req.body.tokenId
  })
  .then(customer => {
    return stripe.invoiceItems.create({
      customer: customer.id,
      amount: Math.floor(req.body.amount),
      currency: "usd",
      description: "Test Payment"
    });
  })
  .then(invoiceItem => {
    return stripe.invoices.create({
      collection_method: "send_invoice",
      customer: invoiceItem.customer as string
    });
  })
  .then(invoice => {
    
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json(err);
  });
});

export default router;