const express = require("express");
const CardValidationController = require("./controller/CardValidationController");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5501;

app.post("/pay", CardValidationController);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
