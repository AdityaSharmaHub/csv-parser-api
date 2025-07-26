require("dotenv").config();
const express = require("express");
const parseCSV = require("./utils/parseCsv");
const { insertUsers, calculateAgeDistribution } = require("./services/dbService");
const { testConnection } = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.get("/upload", async (req, res) => {
  try {
    // Test database connection first
    console.log("🔍 Testing database connection...");
    const isConnected = await testConnection();
    
    if (!isConnected) {
      return res.status(500).json({ 
        success: false, 
        error: "Database connection failed" 
      });
    }
    
    const csvFilePath = process.env.CSV_FILE_PATH || "./uploads/users.csv";
    const users = parseCSV(csvFilePath);
    
    console.log(`Parsed ${users.length} users from CSV`);
    
    await insertUsers(users);
    console.log("Data inserted successfully");
    
    await calculateAgeDistribution();
    
    res.json({ 
      success: true, 
      message: "Upload complete and age distribution printed",
      usersProcessed: users.length 
    });
  } catch (err) {
    console.error("Error processing CSV:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 CSV Parser API listening at http://localhost:${port}`);
  console.log(`📁 CSV File Path: ${process.env.CSV_FILE_PATH || "./uploads/users.csv"}`);
  console.log(`🔗 Upload endpoint: http://localhost:${port}/upload`);
});