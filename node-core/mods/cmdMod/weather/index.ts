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
    空气等级:${air_level}  ${day === 1 ? `    \n实时温度:${tem}℃` : ""}
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
