import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize database connection and server
const startServer = async () => {
  try {
    // Connect to database
    await AppDataSource.initialize();
    console.log("✅ Database connection established");

    // Create Express app AFTER database is initialized
    const app = express();

    // Global middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Debug logging middleware
    app.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
      next();
    });

    // Health check endpoint
    app.get("/health", (req, res) => {
      res.status(200).json({
        status: "ok",
        message: "AURA API is running",
        timestamp: new Date().toISOString(),
      });
    });

    // API routes
    console.log("📝 Registering routes...");
    app.use("/api/auth", authRoutes);
    console.log("✅ Auth routes registered at /api/auth");
    app.use("/api/users", userRoutes);
    console.log("✅ User routes registered at /api/users");

    // 404 route
    app.use((req, res) => {
      res.status(404).json({
        error: "NotFoundError",
        message: "Route not found",
      });
    });

    // Error handling middleware (must be at the end)
    app.use(errorMiddleware);

    // Start server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`📡 Server is listening on all network interfaces`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();

