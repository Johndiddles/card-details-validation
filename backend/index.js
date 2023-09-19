const express = require("express");
const PaymentController = require("./controller/PaymentController");

const app = express();
const PORT = 5501;

app.get("/pay", PaymentController);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
