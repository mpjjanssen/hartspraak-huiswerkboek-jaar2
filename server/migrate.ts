import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { ENV } from "./_core/env.js";

async function runMigrations() {
  console.log("[Migration] Starting database migrations...");
  
  try {
    const connection = await mysql.createConnection(ENV.databaseUrl);
    const db = drizzle(connection);
    
    console.log("[Migration] Running migrations from ./drizzle folder...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    
    console.log("[Migration] ✅ Migrations completed successfully!");
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error("[Migration] ❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
