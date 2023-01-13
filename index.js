import readline from "readline";
import { stdin as input, stdout as output } from "process";
import terminalImage from "terminal-image";
import clear from "clear";
import chalk from "chalk";
import Jimp from "jimp";

class NCLI {
  constructor({
    titleColor,
    subtitleColor,
    msgColor,
    optionsColor,
    inputCharColor,
  } = {}) {
    this._readline = readline;
    this._input = input;
    this._output = output;
    this._terminalImage = terminalImage;
    this._clear = clear;
    this._chalk = chalk;
    this._Jimp = Jimp;

    this._titleColor = titleColor || "blue";
    this._subtitleColor = subtitleColor || "whiteBright";
    this._msgColor = msgColor || "whiteBright";
    this._optionsColor = optionsColor || "green";
    this._inputCharColor = inputCharColor || "blue";
  }

  async #imageProcess(imageObj) {
    try {
      const image = await Jimp.read(imageObj.path);
      const threshold = 0.8;

      // Iterate through all the pixels
      image.scan(
        0,
        0,
        image.bitmap.width,
        image.bitmap.height,
        function (x, y, idx) {
          // Get the pixel color values
          const red = this.bitmap.data[idx + 0];
          const green = this.bitmap.data[idx + 1];
          const blue = this.bitmap.data[idx + 2];

          // Check if the pixel is almost black
          if (
            red / 255 < threshold &&
            green / 255 < threshold &&
            blue / 255 < threshold
          ) {
            // Set the pixel to black
            this.bitmap.data[idx + 0] = 0;
            this.bitmap.data[idx + 1] = 0;
            this.bitmap.data[idx + 2] = 0;
          } else {
            // Set the pixel to white
            this.bitmap.data[idx + 0] = 255;
            this.bitmap.data[idx + 1] = 255;
            this.bitmap.data[idx + 2] = 255;
          }
        }
      );

      // Save the modified image
      await image.write(imageObj.path);
    } catch (error) {
      console.log(error);
    }
  }

  #showTitle(title) {
    console.log(this._chalk[this._titleColor](title));
    console.log();
  }

  #showSubtitle(subtitle) {
    console.log(this._chalk[this._subtitleColor](subtitle));
    console.log();
  }

  #showError() {
    console.log(this._chalk.red("Invalid input, please select again"));
  }

  async #showImage(image) {
    if (image.process) await this.#imageProcess(image);
    console.log(
      await this._terminalImage.file(image.path, {
        width: image.width,
        height: image.height,
        preserveAspectRatio: true,
      })
    );
  }

  async getUserInput({
    title,
    subtitle = null,
    image = {
      path: undefined,
      process: false,
      width: undefined,
      height: undefined,
      preserveAspectRatio: undefined,
    },
    action,
    error = false,
    options = null,
    noClear = false,
  }) {
    if (!noClear) this._clear();
    this.#showTitle(title);
    if (subtitle) this.#showSubtitle(subtitle);
    if (image.path) await this.#showImage(image);
    if (error) this.#showError();

    const rl = this._readline.createInterface({
      input: this._input,
      output: this._output,
    });

    let choice;

    if (!options) {
      choice = await new Promise((resolve) => {
        if (!error) console.log();
        rl.question(this._chalk[this._inputCharColor]("> "), resolve);
      });
    } else {
      options.forEach((option, index) => {
        console.log(
          this._chalk[this._optionsColor](`${index + 1}) ${option.title}`)
        );
      });

      choice = await new Promise((resolve) => {
        if (!error) console.log();
        rl.question(this._chalk[this._inputCharColor]("> "), resolve);
      });

      const selectedAction = options.find((_, index) => index + 1 == choice);

      if (!selectedAction)
        return await this.getUserInput({
          title,
          subtitle,
          options,
          error: true,
        });

      action = selectedAction.action;
    }

    rl.close();

    if (!choice)
      return await this.getUserInput({
        title,
        subtitle,
        action,
        error: true,
        options,
      });

    return await action(choice);
  }

  log({ title, msg, color = "whiteBright", noClear = false }) {
    if (!noClear) this._clear();
    if (title) this.#showTitle(title);
    console.log(chalk[color](msg));
  }

  async waitForKey({
    title,
    msg = "Press enter to continue...",
    color,
    noClear = false,
  } = {}) {
    if (!noClear) this._clear();
    if (title) this.#showTitle(title);

    const rl = this._readline.createInterface({
      input: this._input,
      output: this._output,
    });

    await new Promise((resolve) => {
      rl.question(chalk[color || this._msgColor](msg), resolve);
    });

    rl.close();
  }
}

export default NCLI;
