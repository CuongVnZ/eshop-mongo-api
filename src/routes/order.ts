import { Router, Request, Response } from "express";
import Order from "../models/Order";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyToken";

const router: Router = Router();

//CREATE
router.post("/", verifyToken, async (req: Request, res: Response) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/findById/:id", verifyTokenAndAdmin, async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req: Request, res: Response) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req: Request, res: Response) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:id", verifyTokenAndAuthorization, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ customerId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDER
router.get("/find/:id/:oid", verifyTokenAndAuthorization, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ customerId: req.params.id });
    const order = orders.find((order) => order._id.toString() === req.params.oid);

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req: Request, res: Response) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            "items.pid": {
              $in: [productId],
            },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;