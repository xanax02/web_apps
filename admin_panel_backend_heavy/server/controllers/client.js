import Product from "../models/Product.js";
import User from "../models/User.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";

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

export const getTransactions = async (req, res) => {
  try {
    //sort should be { "field": "userId", "sort", "desc" } from frontend
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormated = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormated;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } }, // i represents case insensitive
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments();

    res.status(200).json({
      transactions,
      total,
    });
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce;
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
};
