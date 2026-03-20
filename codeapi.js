app.post("/order", async (req, res) => {
  const { userId, products, referralCode } = req.body;

  const order = new Order({
    userId,
    products,
    referralUsed: referralCode
  });

  await order.save();

  if (referralCode) {
    const refUser = await User.findOne({ referralCode });
    if (refUser) {
      refUser.rewards += 10;
      await refUser.save();
    }
  }

  res.json({ message: "Order placed" });
});
