import { Bot, Message } from "node-core/instance/types";
import {base} from "../../base";
const Mirai = require("node-mirai-sdk");
const {
  Plain,
  Image,
} = Mirai.MessageComponent;
const axios = require("axios");
const cheerio = require("cheerio");

const headers={
  accept: "application/json, text/plain, */*",
  acceptEncoding: "gzip, deflate, br",
  acceptLanguage: "zh-CN,zh;q=0.9,en;q=0.8",
  origin: 'https://www.bilibili.com',
  referer: 'https://www.bilibili.com/',
  'sec-ch-ua':'"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
  'sec-ch-ua-mobile':'?0',
  'sec-fetch-dest':'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
}

function getNum(s){
  // var num= s.replace(/[^0-9]/ig,"");
  
  return s.replace(/\s+/g,"");   
}

function recommendFormat(recommend){
  recommend=recommend.replace(/;?更多(.*)实用攻略教学(.+)尽在哔哩哔哩bilibili/,' ').replace(/已有.+名.+推荐本视频.+一起观看/,' ').trim();
  recommend=recommend.replace(/相关视频.+/,' ').trim();
  recommend=recommend.replace(/视频播放量 \d+、?/,'')
  recommend=recommend.replace(/弹幕量 \d+、?/,'')
  recommend=recommend.replace(/点赞数 \d+、?/,'')
  recommend=recommend.replace(/投硬币枚数 \d+、?/,'')
  recommend=recommend.replace(/收藏人数 \d+、?/,'')
  recommend=recommend.replace(/转发人数 \d+、?,?/,'')
  recommend=recommend.replace(/视频作者 .+,?/,'')
  recommend=recommend.replace(/作者简介 .+,?/,'')
  recommend=recommend.trim();

    return recommend;
}
function getLike(recommend){
   return recommend.match(/点赞数 (\d+)/)[1]
  
}
function getCoin(recommend){
  return recommend.match(/投硬币枚数 (\d+)/)[1]
}
function getCollection(recommend){
  return recommend.match(/收藏人数 (\d+)/)[1]
}
function getPlayAmount(recommend){
  return recommend.match(/视频播放量 (\d+)/)[1]
}
function getShare(recommend){
  return recommend.match(/转发人数 (\d+)/)[1]
}
class bilibiliQuery implements base{
  static instruction = "bilibili链接解析";
  bot:Bot
  message:Message
  constructor(bot){
    this.bot=bot;
  }
  async action(params){
    const BVCode = params[2]||params[0]
    let url;
    // let url=BVCode.match(/BV/i)==null?BVCode:'https://www.bilibili.com/video/'+BVCode;
    if(BVCode.match(/BV/i)==null){
      url=BVCode
    }else{ 
      url='https://www.bilibili.com/video/'+BVCode;
    }
    url=url.split('?')[0];
    url=url.split('"')[0];

    const res=await axios.get(url,{headers})
    if(!res.data)return false;
    const content=await this.resolveContent(res,url);
    const speakResult=await this.bot.speak(content,this.message)
    return speakResult;
  }
  async resolveContent({data},url){
    console.log("biil链接解析中...");
    const text=unescape((data).replace(/\\u/g, '%u')) //将unicode码转换成中文
    const $ = cheerio.load(text, {
      decodeEntities: false,
    });
    const title=$('title').text().split('_哔哩哔哩')[0];
    const face=$('meta[itemprop="thumbnailUrl"]').attr('content')
    const recommend=$('meta[itemprop="description"]').attr('content')
    const recommendFormatted=recommendFormat(recommend);
    const up=$('.username').text().trim();
    const tags=$('meta[itemprop="keywords"]').attr('content').split(',').splice(1,3).join(',');
    return [
      Image({
        url:face
      }),
      Plain('【标题】: '+title+'\n'),
      Plain('【url】: '+url.split('?')[0]+'\n'),
      Plain('【up】: '+up+'\n'),
      Plain('【标签】: '+tags+'\n'),
      Plain('【介绍】\n'+recommendFormatted+'\n'),
      Plain('【互动数据】\n'),  
      Plain(`点赞:${getLike( recommend)} 投币:${getCoin(recommend)} 收藏:${getCollection(recommend)} 播放:${getPlayAmount(recommend)} 转发:${getShare(recommend)}`),
    ]
  }
}

export const bilibiliLongQuery=bilibiliQuery
export const bilibiliShortQuery=bilibiliQuery