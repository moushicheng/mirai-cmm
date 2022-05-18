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
export class weather implements base {
  static instruction = "天气查询";
  bot: Bot;
  params: any;
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
        this.bot.speak(createData(res));
      })
      .catch((err) => {
        this.bot.speak(err);
      });
  }
}

function createData(data) {
  const city = data.data.city;
  const day_0 = makeOneDayData(data.data.data[0], 0);
  const day_1 = makeOneDayData(data.data.data[1], 1);
  return `城市:${city}` + day_0 + day_1;
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
