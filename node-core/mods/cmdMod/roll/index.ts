/*
 * @Author: 某时橙
 * @Date: 2022-04-30 23:03:05
 * @LastEditTime: 2022-04-30 23:03:06
 * @Description: 请添加介绍
 * @FilePath: \mirai\node-core\mods\cmdMod\roll\index.ts
 */
import { Bot } from "node-core/instance/types";
import { base } from "../../base";

export class roll implements base {
  static instruction = "roll点";
  bot: Bot;
  params: any;
  constructor(bot, params) {
    this.bot = bot;
    this.params = params;
  }
  action(params) {
    let arr = params.split("d");
    let times = arr[0];
    let maxNum = arr[1];
    let result = 0;
    if (times > 100000 || maxNum > 10000) {
      this.bot.speak("数字过大");
      return;
    }
    for (let i = 0; i < times; i++) {
      result += Math.ceil(Math.random() * maxNum);
    }

    this.bot.speak(result.toString());
  }
  error() {
    throw new Error("主动抛出错误");
  }
}
