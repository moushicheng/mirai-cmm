import { Bot } from "node-core/instance/types";
import {base} from "../../base";
import pinyin from 'pinyin'
import { message } from "node-mirai-sdk";
import { getPinyin } from "@/helper";
export class test implements base{
  static instruction='测试'
  bot:Bot
  params:any
  message:message
  constructor(bot,params){
    this.bot=bot;
    this.params=params
    
  }
  action(...params){
   
    this.bot.speak('测试结果: '+`输入参数集:${params},${getPinyin(params[0])}`)
    if(params[0]==='error')this.error()
  }
  error(){
    throw new Error('主动抛出错误')
  }
}