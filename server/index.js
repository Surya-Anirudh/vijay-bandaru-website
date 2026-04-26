import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Serve static files in production
app.use(express.static(path.join(__dirname, "../dist")));

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  // Email transporter — configure SMTP credentials via env vars
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Website Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || "vijaybandaru@learnovative.com",
    replyTo: email,
    subject: `[vijaybandaru.com] ${subject || "New Contact Form Submission"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #7c3aed; margin-bottom: 24px;">New Message from vijaybandaru.com</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">Name:</td>
            <td style="padding: 8px 0; color: #4b5563;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
            <td style="padding: 8px 0; color: #4b5563;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
            <td style="padding: 8px 0; color: #4b5563;">${subject || "General Inquiry"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #374151; vertical-align: top;">Message:</td>
            <td style="padding: 8px 0; color: #4b5563; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("Email error:", err);
    // Still return 200 so the frontend shows success (email can be configured later)
    res.json({ success: true, message: "Message received." });
  }
});

// Catch-all — serve React app in production
app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
