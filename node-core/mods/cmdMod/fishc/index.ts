import { Bot } from "node-core/instance/types";
import {base} from "../../base";
import fs from 'fs'
import path from 'path'
export class fishc implements base{
  static instruction='fishc'
  bot:Bot
  params:any
  constructor(bot,params){
    this.bot=bot;
    this.params=params
    
  }
  action(){
    this.bot.speak(`${Math.random().toFixed(1)}查看使用指南->https://uy52go2jz4.feishu.cn/docx/UXT9dQh0Oow1mMx7POQcIr31nbg?from=from_copylink`)
    const code=fs.readFileSync('node-core/config/code.txt','utf-8');
    // this.bot.speak(code)
  }
  error(){
    throw new Error('主动抛出错误')
  }
}