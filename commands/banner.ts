import chalk from "chalk";
import figlet from "figlet";
const SECOND_ARGUMENT = 2;

figlet.text(process.argv[SECOND_ARGUMENT], (error: any, data: any) => {
  if (error) {
    return process.exit(1);
  }

  console.log(chalk.blue(data));
  console.log("");

  return process.exit(0);
});
