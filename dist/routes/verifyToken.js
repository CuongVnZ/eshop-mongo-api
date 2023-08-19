"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAdmin = exports.verifyTokenAndAuthorization = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.status(403).json("Invalid or expired token.");
            }
            req.body.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("You are not authenticated.");
    }
};
exports.verifyToken = verifyToken;
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.body.user.id === req.params.id || req.body.user.isAdmin) {
            next();
        }
        else {
            res.status(402).json("You are not allowed to do that.");
        }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.body.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You are not allowed to do that.");
        }
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
