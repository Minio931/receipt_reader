import { exportData, exportReceiptsHandler } from "@/controllers/export.controller.js";
import express from "express";

const exportRouter = express.Router();

exportRouter.get("/export", exportData);
exportRouter.post("/export-receipts", exportReceiptsHandler);

export default exportRouter;
