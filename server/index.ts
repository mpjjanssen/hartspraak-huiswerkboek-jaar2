import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // API routes
  const testimonialsRouter = (await import("./routes/testimonials.js")).default;
  app.use("/api/testimonials", testimonialsRouter);

  const sharedHomeworkRouter = (await import("./routes/shared-homework.js")).default;
  app.use("/api/shared-homework", sharedHomeworkRouter);

  const adminSharedRouter = (await import("./routes/admin-shared.js")).default;
  app.use("/api/admin/shared-homework", adminSharedRouter);
  // Route to serve books directly from the public/books folder
  app.get("/api/download-book/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.resolve(__dirname, "..", "public", "books", filename);
    console.log(`[API] Attempting to download book: ${filename} from ${filePath}`);
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error(`[API] Error downloading book ${filename}:`, err);
        res.status(404).send("Bestand niet gevonden");
      }
    });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
