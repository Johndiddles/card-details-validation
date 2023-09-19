const PaymentController = (req, res) => {
  console.log({ body: req.body });
  res.status(200).json({
    message: "success",
    data: req.body,
  });
};

module.exports = PaymentController;
