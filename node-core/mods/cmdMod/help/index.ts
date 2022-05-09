import { Bot } from "node-core/instance/types";
import {base} from "../../base";

export class help implements base{
  static instruction='测试'
  bot:Bot
  params:any
  constructor(bot,params){
    this.bot=bot;
    this.params=params
    
  }
  action(...params){
    this.bot.speak(`橙萌萌指令文档：https://anh8pzdxd6.feishu.cn/docs/doccnTZ6HLq202fe19FWjYd4bKz#
github项目地址i：https://github.com/moushicheng/mirai-cmm
`)
  }
  error(){
    throw new Error('主动抛出错误')
  }
}