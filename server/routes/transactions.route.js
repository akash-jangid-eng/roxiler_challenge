import express from "express";
import { getAllTransactions } from "../controllers/transactions.controller.js";
// import { getStatistics } from "../controllers/statistics.controller.js";
// import { getBarChartData } from "../controllers/barChart.controller.js";
// import { getPieChartData } from "../controllers/pieChart.controller.js";
import { getCombinedData } from "../controllers/combinedData.controller.js";

const router = express.Router();

router.get("/transactions", getAllTransactions);
// router.get("/statistics", getStatistics);
// router.get("/bar-chart", getBarChartData);
// router.get("/pie-chart", getPieChartData);
router.get("/combined-data", getCombinedData);

export default router;
