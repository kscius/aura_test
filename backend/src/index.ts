import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "AURA API is running",
    timestamp: new Date().toISOString(),
  });
});

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Ruta 404
app.use((req, res) => {
  res.status(404).json({
    error: "NotFoundError",
    message: "Route not found",
  });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorMiddleware);

// Inicializar conexión a la base de datos y servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await AppDataSource.initialize();
    console.log("✅ Database connection established");

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();

