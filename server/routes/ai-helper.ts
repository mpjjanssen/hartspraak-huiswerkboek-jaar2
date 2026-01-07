import { Router } from "express";
import { requireAuth } from "../lib/auth";
import { ENV } from "../_core/env";

const router = Router();

// Apply auth middleware
router.use(requireAuth);

/**
 * POST /api/ai-helper/chat
 * Send message to AI and log usage
 */
router.post("/chat", async (req, res) => {
  try {
    const { workshopId, questionId, systemContext, messages, userMessage } = req.body;
    const userId = (req as any).user.userId;
    const userEmail = (req as any).user.email;

    if (!workshopId || !questionId || !userMessage) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Call OpenAI API
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    
    const forgeResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemContext },
          ...messages,
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 2000, // Increased from 500
      }),
    });

    if (!forgeResponse.ok) {
      const errorText = await forgeResponse.text();
      console.error('[AI Helper] OpenAI API Error:', {
        status: forgeResponse.status,
        statusText: forgeResponse.statusText,
        body: errorText
      });
      throw new Error(`OpenAI API request failed: ${forgeResponse.status} ${errorText}`);
    }

    const forgeData = await forgeResponse.json();
    const assistantMessage = forgeData.choices[0].message.content;
    const usage = forgeData.usage;

    // Log AI usage to database (fire and forget)
    if (usage) {
      try {
        const logResponse = await fetch(`${req.protocol}://${req.get('host')}/api/user-data/ai-usage-log`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || '',
          },
          body: JSON.stringify({
            workshopId,
            questionId,
            promptTokens: usage.prompt_tokens || 0,
            completionTokens: usage.completion_tokens || 0,
            totalTokens: usage.total_tokens || 0,
            model: 'gpt-4o-mini',
          }),
        });

        if (!logResponse.ok) {
          console.warn('[AI Helper] Failed to log usage:', await logResponse.text());
        }
      } catch (logError) {
        console.error('[AI Helper] Failed to log usage:', logError);
      }
    }

    res.json({
      content: assistantMessage,
      usage,
    });
  } catch (error) {
    console.error('[AI Helper] Error:', error);
    res.status(500).json({ error: 'Failed to process AI request' });
  }
});

export default router;
