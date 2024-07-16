import { Router, Request, Response } from "express";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51LOeVQEuYDk3LNJoUMW12VAK1QrKdDXqI6TsXxWBJCtxSrzNXGubevjffVDCk4aSwFEzQQnKb4fwPIxaAQOazXTc00xh2AipPi");

const router: Router = Router();

router.post("/payment", async (req: Request, res: Response) => {
  try {
    const charge = await stripe.charges.create({
      source: req.body.tokenId,
      amount: Math.floor(req.body.amount),
      currency: "usd",
    });
    res.status(200).json(charge);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default router;