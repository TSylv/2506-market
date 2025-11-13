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

export default router;
