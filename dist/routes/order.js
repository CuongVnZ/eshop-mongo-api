"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_1 = __importDefault(require("../models/Order"));
const verifyToken_1 = require("./verifyToken");
const router = (0, express_1.Router)();
//CREATE
router.post("/", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new Order_1.default(req.body);
    try {
        const savedOrder = yield newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET
router.get("/findById/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findById(req.params.id);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//UPDATE
router.put("/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield Order_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//DELETE
router.delete("/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Order_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET USER ORDERS
router.get("/find/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ customerId: req.params.id });
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET USER ORDER
router.get("/find/:id/:oid", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ customerId: req.params.id });
        const order = orders.find((order) => order._id.toString() === req.params.oid);
        res.status(200).json(order);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET ALL
router.get("/", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// GET MONTHLY INCOME
router.get("/income", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = yield Order_1.default.aggregate([
            {
                $match: Object.assign({ createdAt: { $gte: previousMonth } }, (productId && {
                    "items.pid": {
                        $in: [productId],
                    },
                })),
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
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
