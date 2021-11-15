const consola = require("consola");
const chalk = require("chalk");

module.exports = class Logger {
  mainColor = "#94DAFF";
  successColor = "#41f45e";
  errorColor = "#ba1e1e";

  async success(text) {
    return consola.success(chalk.hex(this.successColor).bold(text));
  }

  async info(text) {
    return consola.info(chalk.hex(this.mainColor).bold(text));
  }

  async error(text) {
    return consola.error(chalk.hex(this.errorColor).bold(text));
  }

  async connected(tag, id) {
    return this.success(
      `Successfully Login As ${chalk.underline(tag)} ${chalk.grey.italic(
        `(id: ${id})`
      )}`
    );
  }
};
