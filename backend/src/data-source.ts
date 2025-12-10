import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "aura_db",
  synchronize: true, // Auto-create tables (fine for small apps, use migrations in large apps)
  logging: process.env.NODE_ENV === "development",
  entities: [User],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});

