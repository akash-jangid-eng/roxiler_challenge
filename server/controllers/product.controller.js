import axios from "axios";
import { Product } from "../models/product.model.js";

export const fetchData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = response.data;

    if (products && products.length > 0) {
      await Product.deleteMany({});
      console.log("Data cleaned successfully.");
      await Product.insertMany(products);
      console.log("Data fetched and initialized successfully.");
    } else {
      console.log("No product data found to insert.");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
