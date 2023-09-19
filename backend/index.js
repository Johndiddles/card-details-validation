const express = require("express");
const PaymentController = require("./controller/PaymentController");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5501;

app.post("/pay", PaymentController);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
