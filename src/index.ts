import express from "express";

import exportRouter from "./routes/export.routes.js";
import geminiRouter from "./routes/gemini.routes.js";

const app = express();
const port = process.env.PORT ?? "3000";

app.use("/api", geminiRouter);
app.use("/api", exportRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
