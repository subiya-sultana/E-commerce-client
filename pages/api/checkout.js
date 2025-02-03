import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import paypal from "paypal-rest-sdk";

paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
    headers: { "PayPal-Debug-Id": "1" } // Enables detailed logs
  });
  

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;

  await mongooseConnect();

  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let totalAmount = 0;
  let items = [];

  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find((p) => p._id.toString() === productId);
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      totalAmount += quantity * productInfo.price;
      items.push({
        name: productInfo.title,
        price: productInfo.price.toFixed(2),
        currency: "INR",
        quantity: quantity,
      });
    }
  }

  const orderDoc = await Order.create({
    line_items: items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const createPaymentJson = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: `${process.env.PUBLIC_URL}/cart?success=1&orderId=${orderDoc._id}`,
      cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
    },
    transactions: [{ amount: { total: totalAmount.toFixed(2), currency: "INR" }, item_list: { items } }],
  };

  paypal.payment.create(createPaymentJson, (error, payment) => {
    if (error) {
      console.error("PayPal Payment Error:", error);
      res.status(500).json({ error });
    } else {
      const approvalUrl = payment.links.find((link) => link.rel === "approval_url")?.href;
      res.json({ url: approvalUrl });
    }
  });
  
}
