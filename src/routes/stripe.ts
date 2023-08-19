import { Router, Request, Response } from "express";
// import Stripe from "stripe";

const router: Router = Router();
// const stripe = new Stripe("sk_test_51LOeVQEuYDk3LNJoUMW12VAK1QrKdDXqI6TsXxWBJCtxSrzNXGubevjffVDCk4aSwFEzQQnKb4fwPIxaAQOazXTc00xh2AipPi");

// router.post("/payment", (req: Request, res: Response) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: Math.floor(req.body.amount),
//       currency: "usd",
//     },
//     (stripeErr: Stripe.StripeError | null, stripeRes: Stripe.Response<Stripe.Charges.Charge>) => {
//       if (stripeErr) {
//         console.log(stripeErr);
//         return res.status(500).json(stripeErr);
//       }
//       return res.status(200).json(stripeRes);
//     }
//   );
// });

export default router;