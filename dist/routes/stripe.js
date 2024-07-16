"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default("sk_test_51LOeVQEuYDk3LNJoUMW12VAK1QrKdDXqI6TsXxWBJCtxSrzNXGubevjffVDCk4aSwFEzQQnKb4fwPIxaAQOazXTc00xh2AipPi");
const router = (0, express_1.Router)();
router.post("/payment", (req, res) => {
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
            customer: invoiceItem.customer
        });
    })
        .then(invoice => {
    })
        .catch(err => {
        console.log(err);
        return res.status(500).json(err);
    });
});
exports.default = router;
