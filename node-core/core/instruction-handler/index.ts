// import { speak } from "@/helper/index";
import { globalBlackList } from "../../config/instruction";
import { Bot } from "../../instance/types";
import cmdHandler from "./cmdHandler";
import defaultHandler from "./defaultHandler";
import sentenceHandler from "./sentenceHandler";

const INSTRUCTION_SYMBOL = ["!", "！"];

export class instructionHandler {
  bot: Bot;
  constructor(bot: Bot) {
    this.bot = bot;
  }
  public run() {

    const handlerSymbol = this.checkForSelectHandler(
      this.bot.contextIsolate.text
    );
    const handler = new handlerMap[handlerSymbol](this.bot);
    handler.run();
  }
  checkForSelectHandler(text: string): "default" | "sentence" | "cmd" {
    const senderId = this.bot.contextIsolate.message.sender.id;

    if (globalBlackList.includes(senderId)) return "default";
    if(INSTRUCTION_SYMBOL.find((symbol) =>text[0] == symbol))return 'cmd'
    return "sentence";
  }
}

const handlerMap = {
  cmd: cmdHandler,
  sentence: sentenceHandler,
  default: defaultHandler,
};
