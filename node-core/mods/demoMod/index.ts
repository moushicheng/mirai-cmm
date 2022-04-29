import { Bot } from "node-core/instance/types";
import {base} from "../base";

export class test implements base{
  static instruction='测试'
  bot:Bot
  constructor(bot){
    this.bot=bot;
  }
  action(params:any){
    this.bot.speak('测试')
  }
}