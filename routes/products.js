import express from "express";
import db from "../db/client.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT id, title, description, price FROM products;"
    );
    res.send(result.rows);
  } catch (err) {
    next(err);
  }
});

export default router;
