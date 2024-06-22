import Product from "../models/Product.js";
import User from "../models/User.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWtihStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });

        return {
          ...product._doc,
          // ...product,
          stat,
        };
      })
    );

    res.status(200).json(productsWtihStats);
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
};
