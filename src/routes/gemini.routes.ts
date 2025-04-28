import express from "express";
import { processReceipt } from "@/controllers/gemini.controller";
import upload from "@/plugins/muller";

const geminiRouter = express.Router();

geminiRouter.post("/process-receipt", upload.single("file"), processReceipt);

export default geminiRouter;
