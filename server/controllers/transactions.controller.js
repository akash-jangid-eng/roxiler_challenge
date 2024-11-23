import { Product } from "../models/product.model.js";

export const getAllTransactions = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const search = (req.query.keyword || "").trim();
    const month = parseInt(req.query.month) || 0;

    let filters = {};

    if (month !== 0) {
      filters.$expr = { $eq: [{ $month: "$dateOfSale" }, month] };
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      const searchFilter = {
        $or: [{ title: searchRegex }, { description: searchRegex }],
      };

      filters = month !== 0 ? { $and: [filters, searchFilter] } : searchFilter;
    }

    const transactions = await Product.find(filters)
      .sort({ id: 1 })
      .skip((page - 1) * 10)
      .limit(10);

    const totalCount = await Product.countDocuments(filters);

    res.status(200).json({
      success: true,
      transactions,
      totalCount,
      page,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
