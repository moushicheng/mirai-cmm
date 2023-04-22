import { Bot } from "../../instance/types";
import base from "./baseHandler";

export default class defaultHandler implements base {
  bot: Bot;
  constructor(bot: Bot) {
    this.bot = bot;
  }
  public run() {
    console.log('封印....')
  }
}
