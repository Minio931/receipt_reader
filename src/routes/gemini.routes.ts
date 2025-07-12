import { processReceipt } from "@/controllers/gemini.controller";
import upload from "@/plugins/muller";
import express from "express";

const geminiRouter = express.Router();

geminiRouter.post("/process-receipt", upload.array("file"), processReceipt);

export default geminiRouter;
