import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { fetchData } from "./controllers/product.controller.js";
import transactionRoute from "./routes/transactions.route.js";

dotenv.config();

const app = express();

//middleware

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: false,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/transaction", transactionRoute);

app.listen(PORT, async () => {
  try {
    await connectDB();
    await fetchData();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error starting the server", error.message);
  }
});
