const nodemailer = require("nodemailer");

const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

const setCORSHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
};

let transporter;
if (process.env.NODE_ENV === "development" || !process.env.EMAIL_USER) {
  transporter = {
    sendMail: async () => ({
      messageId: `<dev-${Date.now()}@example.com>`,
      response: "Visit logged",
    }),
  };
} else {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

const emailCSS = `
  body { font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; }
  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  .header { border-bottom: 3px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
  .header h1 { margin: 0; color: #0a192f; font-size: 24px; }
  .section { margin-bottom: 25px; }
  .label { color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 8px; }
  .value { color: #1f2933; font-size: 14px; line-height: 1.6; }
  .footer { border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280; }
`;

module.exports = async (req, res) => {
  setCORSHeaders(res);
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userAgent, referrer, timestamp } = req.body;

    if (!timestamp || typeof timestamp !== "string") {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const sanitizedUserAgent = (userAgent || "Unknown").substring(0, 200);
    const sanitizedReferrer = (referrer || "Direct Visit").substring(0, 200);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: "Portfolio Visit Notification",
      html: `<!DOCTYPE html>
<html>
<head><style>${emailCSS}</style></head>
<body>
  <div class="container">
    <div class="header"><h1>Portfolio Visit</h1></div>
    <div class="section">
      <div class="label">Visit Time</div>
      <div class="value">${new Date(timestamp).toLocaleString()}</div>
    </div>
    <div class="section">
      <div class="label">Device Information</div>
      <div class="value">${sanitizedUserAgent}</div>
    </div>
    <div class="section">
      <div class="label">Source</div>
      <div class="value">${sanitizedReferrer}</div>
    </div>
    <div class="footer">
      <p>This is an automated notification from your portfolio.</p>
    </div>
  </div>
</body>
</html>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Visit error:", error.message);
    return res.status(500).json({ error: "Failed to track visit" });
  }
};
