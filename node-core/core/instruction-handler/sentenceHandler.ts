import { Bot } from "../../instance/types";
import base from "./baseHandler";
import * as modlist from "../../mods/index";
const sentenceMatchRegExp = {
  eitherOr: /选择(.+)还是(.+)/,
  biliVideoLong: /(www.bilibili.com\/video\/)?(BV.+)\?*/,
  biliVideoShort: /https:\/\/b23.tv\/\w+\?*/g,
  shutdown: /橙萌萌，麻烦帮我关下机/,
  haoye: /(橙萌萌)?，?我?(今日)(.+)完成啦?/,
};

export default class sentenceHandler implements base {
  bot: Bot;
  text: string;
  constructor(bot: Bot) {
    this.bot = bot;
    this.text = bot.contextIsolate.text;
  }
  public run() {
    const { sentence, funcName, matchResult } = this.analyseSentence(this.text);
    if (funcName === null) return;
    new modlist[funcName]().action(matchResult);
  }
  analyseSentence(sentence) {
    //句式分析
    let matchResult = null;
    for (const [typeName, reg] of Object.entries(sentenceMatchRegExp)) {
      matchResult = sentence.match(reg);
      if (matchResult) {
        return {
          sentence: sentence,
          funcName: typeName,
          matchResult: matchResult,
        };
      }
    }
    return {
      sentence: sentence,
      funcName: null,
      matchResult: null,
    };
  }
}
