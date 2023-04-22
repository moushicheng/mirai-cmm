import { Bot, Message } from "node-core/instance/types";
import { base } from "../../base";
const Mirai = require("node-mirai-sdk");
const { Plain, Image } = Mirai.MessageComponent;
const axios = require("axios");
const cheerio = require("cheerio");

export class linkParse implements base {
  static instruction = "全网链接解析";
  bot: Bot;
  url: string;
  message: Message;
  chain:any[];
  constructor(bot) {
    this.bot = bot;
    this.chain=[];
  }
  async action(matchResult, url) {
    console.log("全网链接解析中...");
    this.url = matchResult[0];
    const content = await axios.get(this.url).then((res) => res.data).catch(error=>{
      console.log(error);
      console.log('无');
    })
    if(!content)return null;
    let $ = cheerio.load(content, {
      decodeEntities: false,
    })
    this.chain.push(Plain(`网站链接解析by ${this.bot.name}\n`))
    

    this.makeContent({
      image:$('meta[property="og:image"]').attr("content"),
      title: $("title:first").text(),
      keywords: $('meta[name="keywords"]').attr("content"),
      description: $('meta[name="description"]').attr("content"),
      isImage:true
    });
    
    const result=this.bot.speak(this.chain,this.message);
    await result.then(res=>{
      if(res.code==500){
        this.chain.splice(1,1);
        this.bot.speak(this.chain,this.message);
      }
    })
  }
  makeContent({image,title,keywords,description,isImage}){
    if(image&&isImage)this.chain.push(Image({
      url:image
    }))
    let content = `\n` 
    if(this.url)content+=`${this.url}\n`
    if(title)content+=`【标题】${title}\n`
    if(keywords)content+=`【关键字】${keywords}`
    if(description)content+=`${description}`
    this.chain.push(Plain(content))
  }
}
