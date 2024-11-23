import { Product } from "../models/product.model.js";

export const getBarChartData = async ({ monthNum }) => {
  try {
    const pipeline = [
      { $addFields: { monthFromDate: { $month: "$dateOfSale" } } },
      ...(monthNum !== 0 ? [{ $match: { monthFromDate: monthNum } }] : []),
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lt: ["$price", 101] }, then: "0-100" },
                { case: { $lt: ["$price", 201] }, then: "101-200" },
                { case: { $lt: ["$price", 301] }, then: "201-300" },
                { case: { $lt: ["$price", 401] }, then: "301-400" },
                { case: { $lt: ["$price", 501] }, then: "401-500" },
                { case: { $lt: ["$price", 601] }, then: "501-600" },
                { case: { $lt: ["$price", 701] }, then: "601-700" },
                { case: { $lt: ["$price", 801] }, then: "701-800" },
                { case: { $lt: ["$price", 901] }, then: "801-900" },
              ],
              default: "901-above",
            },
          },
          count: { $sum: 1 },
        },
      },
    ];

    const result = await Product.aggregate(pipeline);

    const rangeOrder = [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "901-above",
    ];

    return rangeOrder.map((range) => ({
      range,
      count: result.find((item) => item._id === range)?.count || 0,
    }));
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw new Error("Failed to fetch bar chart data");
  }
};
