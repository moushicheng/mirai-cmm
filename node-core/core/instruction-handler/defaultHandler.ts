import { Bot } from "../../instance/types";
import base from "./baseHandler";

export default class defaultHandler implements base {
  bot: Bot;
  constructor(bot: Bot) {
    this.bot = bot;
  }
  public run() {
    this.bot.speak('你被萌萌封在了罐子里，关时橙屁事（逃');
  }
}
