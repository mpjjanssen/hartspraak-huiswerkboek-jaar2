import express from "express";
import { getDb } from "../db";
import { verifiedMembers, authUsers, passwordResetTokens } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { hashPassword, comparePassword, generateToken, validatePassword, generateResetToken, requireAuth } from "../lib/auth";
import { Resend } from "resend";

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Check if email is in verified members list
 * POST /api/auth/check-email
 */
router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log('[CHECK-EMAIL] Received email:', email);
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    const db = await getDb();
    if (!db) {
      console.error('[CHECK-EMAIL] Database not available');
      return res.status(500).json({ error: "Database not available" });
    }
    
    const normalizedEmail = email.toLowerCase();
    console.log('[CHECK-EMAIL] Normalized email:', normalizedEmail);
    
    // First, get all members to debug
    const allMembers = await db
      .select()
      .from(verifiedMembers);
    
    console.log('[CHECK-EMAIL] Total members in database:', allMembers.length);
    console.log('[CHECK-EMAIL] All member emails:', allMembers.map(m => m.email));
    
    // Check if email exists in verified members
    const [member] = await db
      .select()
      .from(verifiedMembers)
      .where(and(
        eq(verifiedMembers.email, normalizedEmail),
        eq(verifiedMembers.status, "active")
      ))
      .limit(1);
    
    console.log('[CHECK-EMAIL] Found member:', member);
    
    if (!member) {
      return res.json({ 
        verified: false, 
        message: "Email not found. Please contact Hartspraak to become a member." 
      });
    }
    
    // Check if already registered
    const [existingUser] = await db
      .select()
      .from(authUsers)
      .where(eq(authUsers.email, email.toLowerCase()))
      .limit(1);
    
    if (existingUser) {
      return res.json({ 
        verified: true, 
        alreadyRegistered: true,
        message: "This email is already registered. Please log in." 
      });
    }
    
    res.json({ verified: true, alreadyRegistered: false });
  } catch (error) {
    console.error("Check email error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Register a new member account
 * POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ error: passwordValidation.message });
    }
    
    // Check if email is verified
    const [member] = await db
      .select()
      .from(verifiedMembers)
      .where(and(
        eq(verifiedMembers.email, email.toLowerCase()),
        eq(verifiedMembers.status, "active")
      ))
      .limit(1);
    
    if (!member) {
      return res.status(403).json({ error: "Email not authorized to register" });
    }
    
    // Check if already registered
    const [existingUser] = await db
      .select()
      .from(authUsers)
      .where(eq(authUsers.email, email.toLowerCase()))
      .limit(1);
    
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    // Hash password and create user
    const passwordHash = await hashPassword(password);
    
    const [newUser] = await db.insert(authUsers).values({
      email: email.toLowerCase(),
      passwordHash,
      verifiedMemberId: member.id,
      status: "active",
    });
    
    // Generate token
    const token = generateToken({
      userId: newUser.insertId,
      email: email.toLowerCase(),
      type: "member",
    });
    
    res.json({ 
      success: true, 
      token,
      user: {
        id: newUser.insertId,
        email: email.toLowerCase(),
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Login
 * POST /api/auth/login
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
    
    // Find user
    const [user] = await db
      .select()
      .from(authUsers)
      .where(eq(authUsers.email, email.toLowerCase()))
      .limit(1);
    
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Check if user is disabled
    if (user.status === "disabled") {
      return res.status(403).json({ error: "Account has been disabled. Please contact Hartspraak." });
    }
    
    // Verify password
    const isValid = await comparePassword(password, user.passwordHash);
    
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    // Update last signed in
    await db
      .update(authUsers)
      .set({ lastSignedIn: new Date() })
      .where(eq(authUsers.id, user.id));
    
    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      type: "member",
    });
    
    res.json({ 
      success: true, 
      token,
      user: {
        id: user.id,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Request password reset
 * POST /api/auth/forgot-password
 */
router.post("/forgot-password", async (req, res) => {
  console.log('[Forgot Password] ===== API CALLED =====');
  try {
    const db = await getDb();
    console.log('[Forgot Password] Database connected');
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const { email } = req.body;
    console.log('[Forgot Password] Email received:', email);
    
    if (!email) {
      console.log('[Forgot Password] No email provided');
      return res.status(400).json({ error: "Email is required" });
    }
    
    // Find user
    console.log('[Forgot Password] Looking up user...');
    const [user] = await db
      .select()
      .from(authUsers)
      .where(eq(authUsers.email, email.toLowerCase()))
      .limit(1);
    
    // Always return success to prevent email enumeration
    if (!user) {
      console.log('[Forgot Password] User not found, returning success anyway');
      return res.json({ success: true, message: "If the email exists, a reset link has been sent" });
    }
    
    console.log('[Forgot Password] User found! Generating token...');
    // Generate reset token
    const token = generateResetToken();
    console.log('[Forgot Password] Token generated');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    // Save token to database
    console.log('[Forgot Password] Saving token to database...');
    await db.insert(passwordResetTokens).values({
      email: email.toLowerCase(),
      token,
      expiresAt,
      used: false,
    });
    console.log('[Forgot Password] Token saved successfully!');
    console.log('[Forgot Password] Returning token to display on screen');
    
    // Return the token to display on screen instead of sending via email
    res.json({ 
      success: true, 
      token: token,
      message: "Reset code generated successfully" 
    });
    console.log('[Forgot Password] ===== COMPLETED SUCCESSFULLY =====');
  } catch (error) {
    console.error('[Forgot Password] ❌ ERROR:', error);
    console.error('[Forgot Password] Error message:', (error as Error).message);
    console.error('[Forgot Password] Error stack:', (error as Error).stack);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Reset password with token
 * POST /api/auth/reset-password
 */
router.post("/reset-password", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({ error: "Token and password are required" });
    }
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ error: passwordValidation.message });
    }
    
    // Find token
    const [resetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(and(
        eq(passwordResetTokens.token, token),
        eq(passwordResetTokens.used, false)
      ))
      .limit(1);
    
    if (!resetToken) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }
    
    // Check if expired
    if (new Date() > resetToken.expiresAt) {
      return res.status(400).json({ error: "Reset token has expired" });
    }
    
    // Find user
    const [user] = await db
      .select()
      .from(authUsers)
      .where(eq(authUsers.email, resetToken.email))
      .limit(1);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Hash new password
    const passwordHash = await hashPassword(password);
    
    // Update password
    await db
      .update(authUsers)
      .set({ passwordHash })
      .where(eq(authUsers.id, user.id));
    
    // Mark token as used
    await db
      .update(passwordResetTokens)
      .set({ used: true })
      .where(eq(passwordResetTokens.id, resetToken.id));
    
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Delete own account
 * DELETE /api/auth/account
 */
router.delete("/account", requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const userId = (req as any).user.userId;
    
    // Delete user account
    await db
      .delete(authUsers)
      .where(eq(authUsers.id, userId));
    
    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Get current user info
 * GET /api/auth/me
 */
router.get("/me", requireAuth, async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }
    
    const userId = (req as any).user.userId;
    
    const [user] = await db
      .select({
        id: authUsers.id,
        email: authUsers.email,
        createdAt: authUsers.createdAt,
        lastSignedIn: authUsers.lastSignedIn,
      })
      .from(authUsers)
      .where(eq(authUsers.id, userId))
      .limit(1);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
