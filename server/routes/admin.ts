import express from "express";
import { getDb } from "../db";
import { verifiedMembers, authUsers, admins } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { hashPassword, comparePassword, generateToken, validatePassword, requireAdmin } from "../lib/auth";

const router = express.Router();

/**
 * Admin login (only info@hartspraak.com)
 * POST /api/admin/login
 */
router.post("/login", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    // Only allow info@hartspraak.com
    if (email.toLowerCase() !== "info@hartspraak.com") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    // Find admin
    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.email, email.toLowerCase()))
      .limit(1);
    
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Verify password
    const isValid = await comparePassword(password, admin.passwordHash);
    
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Update last signed in
    await db
      .update(admins)
      .set({ lastSignedIn: new Date() })
      .where(eq(admins.id, admin.id));
    
    // Generate token
    const token = generateToken({
      userId: admin.id,
      email: admin.email,
      type: "admin",
    });
    
    res.json({ 
      success: true, 
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      }
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Change admin password
 * POST /api/admin/change-password
 */
router.post("/change-password", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const adminId = (req as any).admin.userId;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current and new password are required" });
    }
    
    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({ error: passwordValidation.message });
    }
    
    // Get admin
    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.id, adminId))
      .limit(1);
    
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    
    // Verify current password
    const isValid = await comparePassword(currentPassword, admin.passwordHash);
    
    if (!isValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    
    // Hash new password
    const passwordHash = await hashPassword(newPassword);
    
    // Update password
    await db
      .update(admins)
      .set({ passwordHash })
      .where(eq(admins.id, adminId));
    
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Get all verified members
 * GET /api/admin/verified-members
 */
router.get("/verified-members", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const members = await db
      .select()
      .from(verifiedMembers)
      .orderBy(desc(verifiedMembers.createdAt));
    
    res.json({ members });
  } catch (error) {
    console.error("Get verified members error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Add verified member
 * POST /api/admin/verified-members
 */
router.post("/verified-members", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const adminEmail = (req as any).admin.email;
    const { fullName, email } = req.body;
    
    if (!fullName || !email) {
      return res.status(400).json({ error: "Full name and email are required" });
    }
    
    const normalizedEmail = email.toLowerCase();
    
    // Check if already exists
    const [existing] = await db
      .select()
      .from(verifiedMembers)
      .where(eq(verifiedMembers.email, normalizedEmail))
      .limit(1);
    
    if (existing) {
      return res.status(400).json({ error: "Email already exists in verified members" });
    }
    
    // Add member
    await db.insert(verifiedMembers).values({
      fullName,
      email: normalizedEmail,
      status: "active",
      addedBy: adminEmail,
    });
    
    res.json({ 
      success: true, 
      member: {
        fullName,
        email: normalizedEmail,
        status: "active",
      }
    });
  } catch (error) {
    console.error("Add member error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Update verified member status
 * PATCH /api/admin/verified-members/:id
 */
router.patch("/verified-members/:id", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const memberId = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status || !["active", "disabled"].includes(status)) {
      return res.status(400).json({ error: "Valid status is required (active or disabled)" });
    }
    
    await db
      .update(verifiedMembers)
      .set({ status })
      .where(eq(verifiedMembers.id, memberId));
    
    res.json({ success: true, message: "Member status updated" });
  } catch (error) {
    console.error("Update member status error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Delete verified member
 * DELETE /api/admin/verified-members/:id
 */
router.delete("/verified-members/:id", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const memberId = parseInt(req.params.id);
    
    await db
      .delete(verifiedMembers)
      .where(eq(verifiedMembers.id, memberId));
    
    res.json({ success: true, message: "Member deleted" });
  } catch (error) {
    console.error("Delete member error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Get all registered users
 * GET /api/admin/users
 */
router.get("/users", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const users = await db
      .select({
        id: authUsers.id,
        email: authUsers.email,
        status: authUsers.status,
        createdAt: authUsers.createdAt,
        lastSignedIn: authUsers.lastSignedIn,
        verifiedMemberId: authUsers.verifiedMemberId,
      })
      .from(authUsers)
      .orderBy(desc(authUsers.createdAt));
    
    res.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Update user status (enable/disable account)
 * PATCH /api/admin/users/:id
 */
router.patch("/users/:id", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const userId = parseInt(req.params.id);
    const { status } = req.body;
    
    if (!status || !["active", "disabled"].includes(status)) {
      return res.status(400).json({ error: "Valid status is required (active or disabled)" });
    }
    
    await db
      .update(authUsers)
      .set({ status })
      .where(eq(authUsers.id, userId));
    
    res.json({ success: true, message: "User status updated" });
  } catch (error) {
    console.error("Update user status error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Get dashboard stats
 * GET /api/admin/stats
 */
router.get("/stats", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const [verifiedCount] = await db
      .select({ count: verifiedMembers.id })
      .from(verifiedMembers)
      .where(eq(verifiedMembers.status, "active"));
    
    const [registeredCount] = await db
      .select({ count: authUsers.id })
      .from(authUsers)
      .where(eq(authUsers.status, "active"));
    
    const [totalVerified] = await db
      .select({ count: verifiedMembers.id })
      .from(verifiedMembers);
    
    const [totalRegistered] = await db
      .select({ count: authUsers.id })
      .from(authUsers);
    
    res.json({
      stats: {
        activeVerifiedMembers: verifiedCount?.count || 0,
        activeRegisteredUsers: registeredCount?.count || 0,
        totalVerifiedMembers: totalVerified?.count || 0,
        totalRegisteredUsers: totalRegistered?.count || 0,
      }
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

/**
 * Get usage statistics (metadata only, no encrypted content)
 * GET /api/admin/usage-stats
 */
router.get("/usage-stats", requireAdmin, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    // Import schema
    const { userAnswers, aiConversations, aiUsageLogs } = await import("../../drizzle/schema");
    const { sql } = await import("drizzle-orm");
    
    // Get all users
    const allUsers = await db
      .select({
        id: authUsers.id,
        email: authUsers.email,
      })
      .from(authUsers);

    // Get answer counts per user
    const answerCounts = await db
      .select({
        userId: userAnswers.userId,
        count: sql<number>`count(*)`.as('count'),
        lastActivity: sql<string>`max(${userAnswers.updatedAt})`.as('lastActivity'),
      })
      .from(userAnswers)
      .groupBy(userAnswers.userId);

    // Get conversation counts per user
    const conversationCounts = await db
      .select({
        userId: aiConversations.userId,
        count: sql<number>`count(*)`.as('count'),
        lastActivity: sql<string>`max(${aiConversations.updatedAt})`.as('lastActivity'),
      })
      .from(aiConversations)
      .groupBy(aiConversations.userId);

    // Get total AI calls
    const aiCallsResult = await db
      .select({
        total: sql<number>`count(*)`.as('total'),
      })
      .from(aiUsageLogs);

    const totalAiCalls = aiCallsResult[0]?.total || 0;

    // Combine data per user
    const userStats = allUsers.map(user => {
      const answerData = answerCounts.find((a: any) => a.userId === user.id);
      const conversationData = conversationCounts.find((c: any) => c.userId === user.id);

      // Determine last activity (most recent between answers and conversations)
      let lastActivity: string | null = null;
      if (answerData?.lastActivity && conversationData?.lastActivity) {
        lastActivity = new Date(answerData.lastActivity) > new Date(conversationData.lastActivity)
          ? answerData.lastActivity
          : conversationData.lastActivity;
      } else if (answerData?.lastActivity) {
        lastActivity = answerData.lastActivity;
      } else if (conversationData?.lastActivity) {
        lastActivity = conversationData.lastActivity;
      }

      return {
        userId: user.id,
        email: user.email,
        answerCount: answerData?.count || 0,
        conversationCount: conversationData?.count || 0,
        lastActivity,
      };
    });

    // Calculate totals
    const totalUsers = allUsers.length;
    const totalAnswers = answerCounts.reduce((sum: number, a: any) => sum + Number(a.count), 0);
    const totalConversations = conversationCounts.reduce((sum: number, c: any) => sum + Number(c.count), 0);

    res.json({
      totalUsers,
      totalAnswers,
      totalConversations,
      totalAiCalls,
      users: userStats.sort((a, b) => {
        // Sort by last activity (most recent first)
        if (!a.lastActivity && !b.lastActivity) return 0;
        if (!a.lastActivity) return 1;
        if (!b.lastActivity) return -1;
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      }),
    });
  } catch (error) {
    console.error("Error fetching usage stats:", error);
    res.status(500).json({ error: "Failed to fetch usage statistics" });
  }
});
