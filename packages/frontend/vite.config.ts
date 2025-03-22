import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Define the paths
const localEnvPath = path.resolve(__dirname, "./.env");
const fallbackEnvPath = path.resolve(__dirname, "../../.env");

// Load the environment file manually
const envPath = fs.existsSync(localEnvPath)
  ? localEnvPath
  : fs.existsSync(fallbackEnvPath)
    ? fallbackEnvPath
    : undefined;

if (envPath) dotenv.config({ path: envPath });

// Vite Configuration
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
});
