import { Router } from "express";
import { Resend } from "resend";

const router = Router();

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/submit", async (req, res) => {
  try {
    console.log("[Testimonials] Received submission:", req.body);
    const { name, email, title, story } = req.body;

    // Validate input
    if (!name || !email || !title || !story) {
      return res.status(400).json({ 
        success: false, 
        error: "Alle velden zijn verplicht" 
      });
    }

    // Send email notification to info@hartspraak.com
    const emailResult = await resend.emails.send({
      from: "Hartspraak Huiswerkboek <onboarding@resend.dev>",
      to: "info@hartspraak.com",
      replyTo: email,
      subject: `Nieuwe testimonial: ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">Nieuwe Testimonial Ontvangen</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">${title}</h3>
            
            <p><strong>Naam:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
              <h4>Verhaal:</h4>
              <p style="white-space: pre-wrap; line-height: 1.6;">${story}</p>
            </div>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Deze testimonial is ingediend via het Hartspraak Huiswerkboek formulier.
          </p>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error("[Testimonials] Email send error:", emailResult.error);
      return res.status(500).json({ 
        success: false, 
        error: "Er ging iets mis bij het versturen van de email",
        details: emailResult.error 
      });
    }
    
    console.log("[Testimonials] Email sent successfully:", emailResult.data);

    res.json({ 
      success: true, 
      message: "Testimonial succesvol verzonden" 
    });

  } catch (error) {
    console.error("Testimonial submission error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Er ging iets mis bij het verwerken van uw testimonial" 
    });
  }
});

export default router;
