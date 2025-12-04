import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import ora from "ora";
import chalk from "chalk";

// Read DATABASE_URL from environment. If present, pass it using the
// `datasources` option so the PrismaClient uses the intended DB.
const datasourceUrl = process.env.DATABASE_URL;

// Use a singleton PrismaClient to avoid creating multiple instances
// during hot-reload / serverless warm-up. Attach to global in dev.
declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

const createPrisma = () =>
  datasourceUrl
    ? new PrismaClient({ datasources: { db: { url: datasourceUrl } } })
    : new PrismaClient();

const prisma: PrismaClient =
  (global as any).__prismaClient || createPrisma();

if (process.env.NODE_ENV !== "production") {
  (global as any).__prismaClient = prisma;
}
export async function connectToMongo() {
  const spinner = ora({
    text: chalk.blue("Conectando a Atlas database..."),
    spinner: "dots",
  }).start();

  try {
    await prisma.$connect();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    spinner.succeed(chalk.green("Conectado a Atlas database"));
  } catch (error) {
    spinner.fail(chalk.red("❌ Error conectando a Atlas database"));
    console.error(chalk.gray(error));
  }
}

export default prisma;
