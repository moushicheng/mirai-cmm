import { Bot } from "node-core/instance/types";
import {base} from "../../base";

export class test implements base{
  static instruction='测试'
  bot:Bot
  params:any
  constructor(bot,params){
    this.bot=bot;
    this.params=params
    console.log(params);
    
  }
  action(params:any){
    this.bot.speak('测试'+this.params)
  }
}