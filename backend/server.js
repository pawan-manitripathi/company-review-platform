import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import companyRoutes from "./routes/companyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/companies", companyRoutes);
app.use("/api/reviews", reviewRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});