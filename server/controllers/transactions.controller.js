import { Product } from "../models/product.model.js";

export const getAllTransactions = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const search = req.query.keyword || "";
    const month = parseInt(req.query.month) || 0;

    const filters = {
      $and: [
        month === 0
          ? {}
          : { $expr: { $eq: [{ $month: "$dateOfSale" }, month] } },
        {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$title" },
                  regex: search,
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $toLower: "$description" },
                  regex: search,
                },
              },
            },
          ],
        },
      ],
    };

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
