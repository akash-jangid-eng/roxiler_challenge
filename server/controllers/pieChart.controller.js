import { Product } from "../models/product.model.js";

export const getPieChartData = async ({ monthNum }) => {
  try {
    const pipeline = [
      { $addFields: { monthFromDate: { $month: "$dateOfSale" } } },
      ...(monthNum !== 0 ? [{ $match: { monthFromDate: monthNum } }] : []),
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
    ];

    return await Product.aggregate(pipeline);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    throw new Error("Failed to fetch pie chart data");
  }
};
