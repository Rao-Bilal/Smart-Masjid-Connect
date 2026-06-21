import express from "express";
import { getMembers } from "../controllers/memberController.js";

const router = express.Router();

router.get("/", getMembers);

export default router;