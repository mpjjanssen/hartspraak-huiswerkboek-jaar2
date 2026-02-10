import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // Auth API routes
  const authRouter = (await import("../routes/auth.js")).default;
  app.use("/api/auth", authRouter);
  
  // Admin API routes
  const adminRouter = (await import("../routes/admin.js")).default;
  app.use("/api/admin", adminRouter);
  
  // Testimonials API route
  const testimonialsRouter = (await import("../routes/testimonials.js")).default;
  app.use("/api/testimonials", testimonialsRouter);
  
  // User data API routes (encrypted storage)
  const userDataRouter = (await import("../routes/user-data.js")).default;
  app.use("/api/user-data", userDataRouter);
  
  // AI helper API routes
  const aiHelperRouter = (await import("../routes/ai-helper.js")).default;
  app.use("/api/ai-helper", aiHelperRouter);
  // Spiegelwerk portrait API routes
  const spiegelwerkRouter = (await import("../routes/spiegelwerk-portrait.js")).default;
  app.use("/api/spiegelwerk", spiegelwerkRouter);
  // Workshop reminders API routes
  const workshopRemindersRouter = (await import("../routes/workshop-reminders.js")).default;
  app.use("/api/admin", workshopRemindersRouter);

  // Shared homework API routes
  const sharedHomeworkRouter = (await import("../routes/shared-homework.js")).default;
  app.use("/api/shared-homework", sharedHomeworkRouter);

  const adminSharedRouter = (await import("../routes/admin-shared.js")).default;
  app.use("/api/admin/shared-homework", adminSharedRouter);
// Daily digest API route
  const digestRouter = (await import("../routes/digest.js")).default;
  app.use("/api/admin", digestRouter);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
// Start daily digest cron job
  const { startDailyDigestCron } = await import("../daily-digest.js");
  startDailyDigestCron();
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}/`);
  });
}

startServer().catch(console.error);
