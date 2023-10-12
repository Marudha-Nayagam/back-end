import express, { request, response } from "express";
import { client } from "../main.js";

const router = express.Router();

//Get All Products
router.get("/", async (req, res) => {
  const result = await client
    .db("productdb")
    .collection("productcollection")
    .find({})
    .toArray();
  res.send(result);
});

//Get Product By Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await client
    .db("productdb")
    .collection("productcollection")
    .findOne({ id: id });
  res.send(result);
});

//Add Products
router.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await client
    .db("productdb")
    .collection("productcollection")
    .insertMany(newProduct);
  res.send(result);
});

//Delete Product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await client
    .db("productdb")
    .collection("productcollection")
    .deleteOne({ id: id });
  res.send(result);
});

//Update Product

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const UpdateProduct = req.body;
  const result = await client
    .db("productdb")
    .collection("productcollection")
    .updateOne({ id: id }, { $set: UpdateProduct });
  res.send(result);
});

export const productsRouter = router;
