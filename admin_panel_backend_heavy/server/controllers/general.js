import User from "../models/User.js";

export const getUser = (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(402).json({ message: err.message });
  }
};
