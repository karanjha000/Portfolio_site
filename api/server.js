const express = require("express");
const serverless = require("serverless-http");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "./"), { maxAge: "1d" }));

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Data storage file path
const dataFile = path.join(__dirname, "messages.json");

// Initialize messages file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// GET all messages (optional - for admin purposes)
app.get("/api/messages", (req, res) => {
  try {
    const data = fs.readFileSync(dataFile, "utf8");
    const messages = JSON.parse(data);
    res.json(messages);
  } catch (error) {
    console.error("Error reading messages:", error);
    res.status(500).json({ error: "Failed to read messages" });
  }
});

// POST new contact message
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, message, timestamp } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Sanitize input
    const sanitizedName = String(name).trim().substring(0, 100);
    const sanitizedEmail = String(email).trim().toLowerCase();
    const sanitizedMessage = String(message).trim().substring(0, 5000);

    // Read existing messages
    const data = fs.readFileSync(dataFile, "utf8");
    const messages = JSON.parse(data);

    // Add new message
    const newMessage = {
      id: Date.now(),
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      timestamp: timestamp || new Date().toISOString(),
      read: false,
    };

    messages.push(newMessage);

    // Save to file
    fs.writeFileSync(dataFile, JSON.stringify(messages, null, 2));

    // Send success response
    res.status(201).json({
      success: true,
      message: "Message received successfully",
      id: newMessage.id,
    });

    if (NODE_ENV === "development") {
      console.log(`✓ New message from ${sanitizedName} (${sanitizedEmail})`);
    }
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
module.exports = serverless(app);
