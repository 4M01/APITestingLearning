import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

const envPath = process.cwd() + "\\test.env";
console.log(envPath);
// config({ path: "C:\\Users\\2amol\\Desktop\\APITestingLearning\\test.env" });

config({ path: envPath });


export default defineConfig({
  use: {
    baseURL: process.env.URL,
    ignoreHTTPSErrors: true,
    trace: "retain-on-failure",
  },
  retries: 0,
  reporter: [["list"], ["html"]],
});