import { PrismaClient } from "../generated/prisma/client";
import ora from "ora";
import chalk from "chalk";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

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
