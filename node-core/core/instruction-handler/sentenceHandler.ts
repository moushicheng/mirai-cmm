import { Bot } from "../../instance/types";
import base from "./baseHandler";
import * as modlist from "../../mods/index";
const sentenceMatchRegExp = {
  eitherOr: /选择(.+)还是(.+)/,
  bilibiliLongQuery: /(www.bilibili.com\/video\/)?(BV.+)\?*/,
  bilibiliShortQuery: /https:\/\/b23.tv\/\w+\?*/g,
  linkParse: /(https?:\/\/)?(([0-9a-z.]+\.[a-z]+)|(([0-9]{1,3}\.){3}[0-9]{1,3}))(:[0-9]+)?(\/[0-9a-z%/.\-_]*)?(\?[0-9a-z=&%_\-]*)?(\#[0-9a-z=&%_\-]*)?/i,
};

export default class sentenceHandler implements base {
  bot: Bot;
  text: string;
  constructor(bot: Bot) {
    this.bot = bot;
    this.text = bot.contextIsolate.text;
  }
  public async run() {
    const matchResults= this.analyseSentence(this.text);
    const message=this.bot.contextIsolate.message
    for(let i=0;i<matchResults.length;i++){
      const res=await this.resolveSentence(matchResults[i],message)
      console.log(res);
      if(typeof res=='object' && res?.code==0)break;
      if(res)break;
    }
  }
  async resolveSentence({sentence,funcName,matchResult},message){
    if (funcName === null) return;
    const mod=new modlist[funcName](this.bot, matchResult,sentence)
    mod.message=message
    const res= await mod.action(matchResult,sentence);
    return res;
  }
  analyseSentence(sentence) {
    //句式分析
    const  matchResults = []
    for (const [typeName, reg] of Object.entries(sentenceMatchRegExp)) {
      const matchResult = sentence.match(reg);
      if (matchResult) {
        matchResults.push({
          sentence: sentence,
          funcName: typeName,
          matchResult: matchResult,
        })
      }
    }
    return matchResults;
  }
}
