   console.log("INDEX BARU DIJALANKAN");

import express from "express";
import taskRoutes from "./routes/task-route";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Management API berjalan");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});