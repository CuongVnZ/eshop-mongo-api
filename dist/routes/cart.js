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
const Cart_1 = __importDefault(require("../models/Cart"));
const verifyToken_1 = require("./verifyToken");
const router = (0, express_1.Router)();
//CREATE
router.post("/", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = new Cart_1.default(req.body);
    try {
        const savedCart = yield newCart.save();
        res.status(200).json(savedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//UPDATE
router.put("/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCart = yield Cart_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//DELETE
router.delete("/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Cart_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET USER CART
router.get("/find/:userId", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.default.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET ALL
router.get("/", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield Cart_1.default.find();
        res.status(200).json(carts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
