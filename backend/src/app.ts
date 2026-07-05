import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

app.get("/health", (_, res) => {
  res.json({
    status: true,
    message: "Server is running",
  })
});

export default app;