import { Product } from "../models/product.model.js";

export const getStatistics = async ({ monthNum }) => {
  try {
    const pipeline = [
      { $addFields: { monthFromDate: { $month: "$dateOfSale" } } },
      ...(monthNum !== 0 ? [{ $match: { monthFromDate: monthNum } }] : []),
    ];

    const totalSale = await Product.aggregate([
      ...pipeline,
      { $match: { sold: true } },
      { $group: { _id: null, totalSaleAmount: { $sum: "$price" } } },
    ]);

    const soldItemsCount = await Product.aggregate([
      ...pipeline,
      { $match: { sold: true } },
      { $count: "count" },
    ]);

    const notSoldItemsCount = await Product.aggregate([
      ...pipeline,
      { $match: { sold: false } },
      { $count: "count" },
    ]);

    return {
      totalSaleAmount: totalSale.length > 0 ? totalSale[0].totalSaleAmount : 0,
      soldItemsCount: soldItemsCount.length > 0 ? soldItemsCount[0].count : 0,
      notSoldItemsCount:
        notSoldItemsCount.length > 0 ? notSoldItemsCount[0].count : 0,
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw new Error("Failed to fetch statistics");
  }
};
