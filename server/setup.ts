import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { verifiedMembers, admins } from "../drizzle/schema.js";
import { eq } from "drizzle-orm";
import { ENV } from "./_core/env.js";
import bcrypt from "bcryptjs";

async function setupInitialData() {
  console.log("[Setup] Checking initial data setup...");
  
  try {
    const connection = await mysql.createConnection(ENV.databaseUrl);
    const db = drizzle(connection);
    
    // Check if verified members table is empty
    const existingMembers = await db.select().from(verifiedMembers).limit(1);
    
    if (existingMembers.length === 0) {
      console.log("[Setup] No verified members found. Adding initial member...");
      
      // Add the initial verified member
      await db.insert(verifiedMembers).values({
        fullName: "Hartspraak Admin",
        email: "info@hartspraak.com",
        status: "active",
        addedBy: "system",
      });
      
      console.log("[Setup] ✅ Initial verified member added: info@hartspraak.com");
    } else {
      console.log("[Setup] ✅ Verified members already exist. Skipping setup.");
    }
    
    // Check if admin exists
    const existingAdmins = await db.select().from(admins).where(eq(admins.email, "info@hartspraak.com")).limit(1);
    
    if (existingAdmins.length === 0) {
      console.log("[Setup] No admin found. Creating admin account...");
      
      // Create admin with default password "Admin2024!"
      const defaultPassword = "Admin2024!";
      const passwordHash = await bcrypt.hash(defaultPassword, 10);
      
      await db.insert(admins).values({
        email: "info@hartspraak.com",
        passwordHash,
      });
      
      console.log("[Setup] ✅ Admin account created: info@hartspraak.com");
      console.log("[Setup] ⚠️  Default password: Admin2024!");
      console.log("[Setup] ⚠️  Please change this password after first login!");
    } else {
      console.log("[Setup] ✅ Admin account already exists. Skipping.");
    }
    
    await connection.end();
  } catch (error) {
    console.error("[Setup] ❌ Setup failed:", error);
    throw error;
  }
}

setupInitialData();
