import { getDb } from "./server/db";
import { verifiedMembers } from "./drizzle/schema";
import { eq } from "drizzle-orm";

async function checkMember() {
  const email = "martienjanssen@unitybox.de";
  
  console.log("Checking for email:", email);
  console.log("Also checking lowercase:", email.toLowerCase());
  
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }
  
  // Check exact match
  const [exactMatch] = await db
    .select()
    .from(verifiedMembers)
    .where(eq(verifiedMembers.email, email))
    .limit(1);
  
  console.log("\nExact match result:", exactMatch);
  
  // Check lowercase match
  const [lowercaseMatch] = await db
    .select()
    .from(verifiedMembers)
    .where(eq(verifiedMembers.email, email.toLowerCase()))
    .limit(1);
  
  console.log("\nLowercase match result:", lowercaseMatch);
  
  // Get all members
  const allMembers = await db
    .select()
    .from(verifiedMembers);
  
  console.log("\n=== ALL VERIFIED MEMBERS ===");
  allMembers.forEach(member => {
    console.log(`- ${member.fullName} (${member.email}) - Status: ${member.status}`);
  });
  
  process.exit(0);
}

checkMember().catch(console.error);
