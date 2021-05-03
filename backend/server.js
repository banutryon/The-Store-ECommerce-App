import express from "express";
import mongoose from "mongoose";
import path from "path";
import config from "./config.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

const mongodbURL = config.MONGODB_URL;
const paypal = config.PAYPAL_CLIENT_ID;
const googleApi = config.GOOGLE_API_KEY;
// dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(mongodbURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
	res.send(paypal);
});
app.get("/api/config/google", (req, res) => {
	res.send(googleApi);
});
// app.get("/api/test", (req, res) => {
// 	res.send(Data.users);
// });
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
// app.get("/", (req, res) => {
// 	res.send("Server is ready");
// });
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});
const port = config.PORT;
app.listen(port, () => {
	console.log(`Serve at http://localhost:${port}`);
});
