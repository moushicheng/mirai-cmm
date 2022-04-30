import { Bot } from "node-core/instance/types";
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


class bilibiliQuery implements base{
  static instruction = "bilibili链接解析";
  bot:Bot
  constructor(bot){
    this.bot=bot;
  }
  action(params){
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
    axios
      .get(url,{headers})
      .then((res) => {
        console.log("解析中...");
        let text=unescape((res.data).replace(/\\u/g, '%u')) //将unicode码转换成中文
        let $ = cheerio.load(text, {
          decodeEntities: false,
        });
        let title=$('title').text().split('_哔哩哔哩')[0];
        let face=$('meta[itemprop="thumbnailUrl"]').attr('content')
        let recommend=$('meta[itemprop="description"]').attr('content')
        recommend=recommend.replace(/;?更多(.*)实用攻略教学(.+)尽在哔哩哔哩bilibili/,' ').replace(/已有.+名.+推荐本视频.+一起观看/,' ').trim();
        recommend=recommend.length==0?'冇简介':recommend
        let like=$('.ops .like').text();
        let coin=$('.ops .coin').text();
        let collect=$('.ops .collect').text();
        let up=$('.username').text().trim();
        let tags=$('meta[itemprop="keywords"]').attr('content').split(',').splice(1,3).join(',');
        let share=$('span[title="分享"]').text();
        this.bot.speak([
          Image({
            url:face
          }),
          Plain('【标题】: '+title+'\n'),
          Plain('【url】: '+url.split('?')[0]+'\n'),
          Plain('【up】: '+up+'\n'),
          Plain('【标签】: '+tags+'\n'),
          Plain('【介绍】\n'+recommend+'\n'),
          Plain('【互动数据】\n'),  
          Plain('点赞: '+getNum(like)+'  '+'投币: '+getNum(coin)+'  '+'收藏: '+getNum(collect)+'  '+'分享: '+getNum(share)+'\n')
        ])
  
      })
      .catch((res) => {
        console.log(res)
        console.log('bili匹配失败');
      });
  }
}
export const bilibiliLongQuery=bilibiliQuery
export const bilibiliShortQuery=bilibiliQuery