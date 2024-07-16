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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const product_1 = __importDefault(require("./routes/product"));
const cart_1 = __importDefault(require("./routes/cart"));
const order_1 = __importDefault(require("./routes/order"));
const stripe_1 = __importDefault(require("./routes/stripe"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
app.use("/api/users", user_1.default);
app.use("/api/products", product_1.default);
app.use("/api/carts", cart_1.default);
app.use("/api/orders", order_1.default);
app.use("/api/checkout", stripe_1.default);
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mongoose_1.default
            .connect(process.env.MONGO_URL || "", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log("Database Connected Successfully!"));
    });
}
connectDB()
    .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log("Backend server is running on port " + port + "!");
    });
})
    .catch((err) => {
    console.log(err);
});
