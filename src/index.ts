// src/index.ts
import express from "express";
import productsRouter from "./routes/products";

const app = express();
const PORT = 3000;

// ✅ PDF에 있던 "Middleware" 예시
// 요청 들어올 때 JSON body 읽을 수 있게 함
app.use(express.json());

// ✅ PDF에 있던 "Routes"
// /products 로 들어오는 요청은 전부 productsRouter가 처리
app.use("/products", productsRouter);

// 기본 라우트 (옵션)
app.get("/", (req, res) => {
  res.send("Express.js CRUD / BREAD example");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
