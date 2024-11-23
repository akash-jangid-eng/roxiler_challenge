import { getStatistics } from "./statistics.controller.js";
import { getPieChartData } from "./pieChart.controller.js";
import { getBarChartData } from "./barChart.controller.js";

export const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    const monthNum = parseInt(month);
    if (isNaN(monthNum) || monthNum < 0 || monthNum > 12) {
      return res.status(400).json({
        success: false,
        message: `Invalid month parameter: ${month}. Month must be a number between 0 and 12.`,
      });
    }

    const statistics = await getStatistics({ monthNum });
    const pieChartData = await getPieChartData({ monthNum });
    const barChartData = await getBarChartData({ monthNum });

    const combinedData = {
      statistics,
      pieChartData,
      barChartData,
    };

    return res.status(200).json({
      success: true,
      data: combinedData,
    });
  } catch (error) {
    console.error("Error fetching combined data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
