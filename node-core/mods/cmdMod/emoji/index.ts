import { Bot } from "node-core/instance/types";
import {base} from "../../base";
const { default: axios } = require("axios");
const API="https://www.gstatic.com/android/keyboard/emojikitchen"
import Mirai from "node-mirai-sdk";
const {  Image } = Mirai.MessageComponent;
let supportEmojis=null

export class mixEmoji implements base{
  static instruction='测试'
  bot:Bot
  params:any
  supportEmojis:any[];
  url:string
  constructor(bot,params){
    this.bot=bot;
    this.params=params
    
  }
  async action(emoji1,emoji2){
  const message=this.bot.contextIsolate.message

   await this.getSupportEmojis();
   this.getImageUrl(decodeEmoji(emoji1),decodeEmoji(emoji2));
   this.send(message);
   if(emoji1!=emoji2){
    this.getImageUrl(decodeEmoji(emoji2),decodeEmoji(emoji1));
    this.send(message);
   }
  }
  error(){
    throw new Error('主动抛出错误')
  }
  async getSupportEmojis(){
    if(supportEmojis){this.supportEmojis=supportEmojis;return;}
    const {data}=await axios.get('https://tikolu.net/emojimix/emojis.js');
    let res=data.match(/const emojis = \[(.+)\]*?;/s)[0];
    res=res.replace('const emojis =','')
    this.supportEmojis=eval(res);
    supportEmojis=this.supportEmojis;
  } 
  getImageUrl(emoji1,emoji2){
    const temp=Number('0x'+emoji1)
     const date=this.supportEmojis.find((emoji)=>{
       return emoji[0].find(item=>temp==item)
     });
     if(!date)return null;
     this.url=`${API}/${date[1]}/u${emoji1}/u${emoji1}_u${emoji2}.png`;
  }
  send(message){
    this.bot.instance.reply([
        Image({
            url:this.url
        })],message
    )
  }
}

function decodeEmoji(emoji){
  return emoji.codePointAt(0).toString(16)
}