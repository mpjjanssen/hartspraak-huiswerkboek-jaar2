import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url );
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // API routes
  const testimonialsRouter = (await import("./routes/testimonials.js")).default;
  app.use("/api/testimonials", testimonialsRouter);

  const sharedHomeworkRouter = (await import("./routes/shared-homework.js")).default;
  app.use("/api/shared-homework", sharedHomeworkRouter);

  const adminSharedRouter = (await import("./routes/admin-shared.js")).default;
  app.use("/api/admin/shared-homework", adminSharedRouter);
  
  // DEZE ROUTE MOET HIER STAAN (VOOR DE STATISCHE BESTANDEN)
  app.get("/api/download-book/:filename", async (req, res) => {
    const filename = req.params.filename;
    const fs = await import("fs");
    const pathsToTry = [
      path.resolve(__dirname, "..", "public", "books", filename),
      path.resolve(__dirname, "public", "books", filename),
      path.resolve(process.cwd(), "public", "books", filename)
    ];
    let foundPath = null;
    for (const p of pathsToTry) {
      if (fs.existsSync(p)) { foundPath = p; break; }
    }
    if (foundPath) {
      res.download(foundPath, filename);
    } else {
      res.status(404).send("Bestand niet gevonden.");
    }
  });

  const staticPath = process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);
