import express from "express";
import db from "../db/client.js";
import requireUser from "../middleware/requireUser.js";

const router = express.Router();

router.get("/", requireUser, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `
      SELECT id, date, note, user_id
      FROM orders
      WHERE user_id = $1;
      `,
      [userId]
    );

    res.send(result.rows);
  } catch (err) {
    next(err);
  }
});


router.post("/", requireUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { note } = req.body;

   const {
  rows: [order],
} = await db.query(
  `
      INSERT INTO orders (date, note, user_id)
      VALUES (NOW(), $1, $2)
      RETURNING id, date, note, user_id;
      `,
  [note, userId]
);


    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});

export default router;
