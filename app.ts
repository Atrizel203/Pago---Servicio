import express from "express";
import cors from "cors";

import paymentRouter from "./payment/infraestructure/paymentRouter";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payments", paymentRouter);

app.listen(4000, () => {
    console.log('Server runngin at 4000');
});
