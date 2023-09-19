const CardValidationController = (req, res) => {
  const { card_number, card_expiry, card_cvv } = req.body;
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = Number(`${date.getFullYear()}`?.substring(2, 4));
  const card_month = Number(card_expiry.split("/")[0]);
  const card_year = Number(card_expiry.split("/")[1]);

  const errorsList = [];

  if (card_number?.length < 16 || card_number?.length > 19) {
    errorsList.push("Invalid card number");
  }

  if (
    card_cvv?.length < 2 ||
    (card_cvv?.length > 3 &&
      !(card_number.startsWith("34") || card_number.startsWith("37"))) ||
    ((card_number.startsWith("34") || card_number.startsWith("37")) &&
      card_cvv?.length !== 4)
  ) {
    errorsList.push("Invalid Security Code (CVV)");
  }

  if (card_year < year || (card_month < month && card_year === year)) {
    errorsList.push("Expired Card");
  }

  if (errorsList?.length > 0) {
    return res.status(400).json({
      status: "failed",
      message: errorsList?.join(", "),
    });
  }

  res.status(200).json({
    status: "success",
    data: req.body,
  });
};

module.exports = CardValidationController;
