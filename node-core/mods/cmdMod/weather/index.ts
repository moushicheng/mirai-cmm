/*
 * @Author: moushicheng 1163675107@qq.com
 * @Date: 2022-04-30 22:57:57
 * @LastEditors: moushicheng 1163675107@qq.com
 * @LastEditTime: 2022-05-18 10:50:31
 * @FilePath: \mirai\node-core\mods\cmdMod\weather\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Bot } from "node-core/instance/types";
import { base } from "../../base";
import axios from "axios";
import { message } from "node-mirai-sdk";
import { endStatus, responser, status } from "@/core/response";
import { getPage } from "@/helper";
export class weather implements base {
  static instruction = "天气查询";
  bot: Bot;
  params: any;
  message: message
  constructor(bot) {
    this.bot = bot;
  }
  action(...params) {
    this.query(params[0]);
  }
  query(city = "广州") {
    axios
      .get("https://www.tianqiapi.com/api/", {
        params: {
          appid: "17167897",
          appsecret: "YT7foKCa",
          version: "v9",
          city,
        },
      })
      .then((res) => {
        this.bot.speak(createData(res, city), this.message);
        const weatherResponser = new responser(this.bot);
        weatherResponser.city = city;
        weatherResponser.changeStatus(startStatus);
      })
      .catch((err) => {
        this.bot.speak(err, this.message);
      });
  }
}

function createData(data, originCity) {
  const city = data.data.city;
  if (originCity !== city) return '找不到该城市'
  const day_0 = makeOneDayData(data.data.data[0], 0);
  return `城市:${city}` + day_0 + '输入【详情】查看更多'
}
function makeOneDayData(data, day) {
  const date = data.day;
  const weather = data.wea;
  const air_level = data.air_level;
  const tem = data.tem;
  const tem1 = data.tem1;
  const tem2 = data.tem2;
  const tips = data.air_tips;
  const humidity = data.humidity;
  const pressure = data.pressure;
  let res = `
    日期:${date}
    天气:${weather}
    空气等级:${air_level}  ${day === 0 ? `    \n    实时温度:${tem}℃` : ""}
    最高温度:${tem1}℃ 
    最低温度:${tem2}℃`;
  if (tips) {
    res += `
    湿度:${humidity}
    气压:${pressure}
    tips:${tips}
  `;
  }
  return res;
}

class startStatus implements status {
  responser: responser;
  city: string;
  isEnd: boolean
  constructor(responser: responser) {
    this.responser = responser;
    this.city = responser.city
    this.isEnd = false
    setTimeout(() => {
      if (this.isEnd == false) {
        responser.changeStatus(endStatus);
        this.isEnd = true;
      }
    }, 1000 * 40);
  }
  async run() {
    if(this.responser.bot.contextIsolate.text!='详情'||this.isEnd){
      return ;
    }
    const outPath='node-core/statics/img/out/weather.png'
    await getPage(`https://wttr.in/${this.city}`, {
      width: 920,
      height: 600,
      outPath: outPath
    })
    this.responser.bot.instance.sendImageMessage(outPath, this.responser.curMessage);
    this.toEnd();
  }
  toEnd() {
    this.responser.changeStatus(endStatus)
    this.isEnd = true;
  }
}