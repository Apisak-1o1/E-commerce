const prisma = require("../config/prisma");

exports.listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enable: true,
        address: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.changeStatus = async (req, res) => {
  try {
    const { id, enable } = req.body;
    console.log(id, enable);
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { enable: enable },
    });

    res.send("Update Status Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.changeRole = async (req, res) => {
  try {
    const { id, role } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { role: role },
    });

    res.send("Update Role Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    console.log(cart);
    console.log(req.user.id);

    const user = await prisma.user.findFirst({
      where: { id: Number(req.user.id) },
    });
    for (const item of cart) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
        select: { quantity: true, title: true },
      });
      if (!product || item.count > product.quantity) {
        return res.status(400).json({
          ok: false,
          message: `ขออภัย. สินค้า ${product?.title || "product"} หมด`,
        });
      }
    }

    await prisma.productOnCart.deleteMany({
      where: {
        cart: {
          orderById: user.id,
        },
      },
    });
    await prisma.cart.deleteMany({
      where: { orderById: user.id },
    });

    let products = cart.map((item) => ({
      productId: item.id,
      count: item.count,
      price: item.price,
    }));

    let cartTotal = products.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    const newCart = await prisma.cart.create({
      data: {
        products: {
          create: products,
        },
        cartTotal: cartTotal,
        orderById: user.id,
      },
    });
    console.log(newCart);
    res.send("Add Cart Ok");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getUserCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderById: Number(req.user.id),
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    console.log(cart);
    res.json({
      products: cart.products,
      cartTotal: cart.cartTotal,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.emptyCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { orderById: Number(req.user.id) },
    });
    if (!cart) {
      return res.status(400).json({ message: "No cart" });
    }
    await prisma.productOnCart.deleteMany({
      where: { cartId: cart.id },
    });
    const result = await prisma.cart.deleteMany({
      where: { orderById: Number(req.user.id) },
    });

    console.log(result);
    res.json({
      message: "Cart Empty Success",
      deletedCount: result.count,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.saveAddress = async (req, res) => {
  try {
    const { address } = req.body;
    console.log(address);
    const addresssUser = await prisma.user.update({
      where: {
        id: Number(req.user.id),
      },
      data: {
        address: address,
      },
    });

    res.json({ ok: true, message: "Address update success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.saveOrder = async (req, res) => {
  try {
    const { id, amount, status, currency } = req.body.paymentIntent;

    const userCart = await prisma.cart.findFirst({
      where: {
        orderById: Number(req.user.id),
      },
      include: { products: true },
    });

    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({ ok: false, message: "Cart is Empty" });
    }

    const amountTHB = Number(amount) / 100;
    const order = await prisma.order.create({
      data: {
        products: {
          create: userCart.products.map((item) => ({
            productId: item.productId,
            count: item.count,
            price: item.price,
          })),
        },
        orderBy: {
          connect: { id: req.user.id },
        },
        cartTotal: userCart.cartTotal,
        stripePaymentId: id,
        amount: amountTHB,
        status: status,
        currentcy: currency,
      },
    });
    const update = userCart.products.map((item) => ({
      where: { id: item.productId },
      data: {
        quantity: { decrement: item.count },
        sold: { increment: item.count },
      },
    }));
    console.log(update);

    await Promise.all(update.map((updated) => prisma.product.update(updated)));

    await prisma.cart.deleteMany({
      where: { orderById: Number(req.user.id) },
    });
    res.json({ ok: true, order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { orderById: Number(req.user.id) },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (orders.length === 0) {
      return res.status(400).json({ ok: false, message: "No orders" });
    }

    res.json({ ok: true, orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};