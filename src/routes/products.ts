// src/routes/products.ts
import { Router, Request, Response } from "express";
import { products } from "../data/products";
import { Product } from "../types/product";

const router = Router();

/**
 * B - Browse
 * GET /products
 * -> 전체 상품 목록
 */
router.get("/", (req: Request, res: Response) => {
  res.json(products);
});

/**
 * R - Read
 * GET /products/:id
 * -> 특정 상품 하나 보기
 */
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
    // PDF에서 말한 "에러 처리"의 아주 기본형
  }

  res.json(product);
});

/**
 * A - Add (Create)
 * POST /products
 */
router.post("/", (req: Request, res: Response) => {
  const { product_name, product_description, product_price } = req.body;

  if (!product_name || product_price === undefined) {
    return res.status(400).json({
      message: "product_name and product_price are required",
    });
  }

  const newProduct: Product = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    product_name,
    product_description: product_description || "",
    product_price: Number(product_price),
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

/**
 * E - Edit (Update)
 * PUT /products/:id
 */
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { product_name, product_description, product_price } = req.body;

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existing = products[index];

  const updated: Product = {
    ...existing,
    product_name: product_name ?? existing.product_name,
    product_description: product_description ?? existing.product_description,
    product_price:
      product_price !== undefined ? Number(product_price) : existing.product_price,
  };

  products[index] = updated;

  res.json(updated);
});

/**
 * D - Delete
 * DELETE /products/:id
 */
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);

  res.json({ message: "Product deleted" });
});

export default router;
