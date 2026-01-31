const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Data storage file path
const dataFile = path.join(__dirname, "messages.json");

// Initialize messages file if it doesn't exist
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
}

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

    // Read existing messages
    const data = fs.readFileSync(dataFile, "utf8");
    const messages = JSON.parse(data);

    // Add new message
    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp,
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

    console.log(`✓ New message from ${name} (${email}) - ID: ${newMessage.id}`);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n═══════════════════════════════════════`);
  console.log(`🚀 Portfolio Server Running`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`💾 Messages stored in: ${dataFile}`);
  console.log(`═══════════════════════════════════════\n`);
});
