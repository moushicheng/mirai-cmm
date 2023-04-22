import axios from "axios";
import { Bot } from "node-core/instance/types";
import { message } from "node-mirai-sdk";
import { base } from "../../base";
enum STATUS {
  '空',
  '急速 00-05',
  '畅通 05-15',
  '忙碌 15-30',
  '拥堵 30-寄',
  '全寄了'
}
export class acidTest implements base {
  static instruction = '核酸检测'
  bot: Bot
  params: any
  message: message;
  constructor(bot, params) {
    this.bot = bot;
    this.params = params
    this.setMessage();
  }
  async action() {
    const data = await axios.post('http://42.193.146.37:3001/nucleicAcidQueue/withOutAuth/search', {
      placeId: 1,
    }).then(res => res.data.result.nucleicAcidQueueList)
    console.log(data);
    const dataFormatted = data.map(item => {
      const time = new Date();
      return {
        congestionDegreeId: item.congestionDegreeId,
        text: item.remark,
        time: Math.floor((new Date().valueOf() - new Date(item.createdAt).valueOf()) / 1000 / 60) + '分前'
      }
    })
    let speakResult = '核酸排队情况 by '+this.bot.name
    for (let i = 0; i < Math.min(5, dataFormatted.length); i++) {
      const item = dataFormatted[i]
      speakResult += `
     【${item.time}】`
      if (STATUS[item.congestionDegreeId]) speakResult += `【${STATUS[item.congestionDegreeId]}】`

      if (item.text) speakResult += `${item.text}`
    }
    speakResult+=`
-详情wx小程序【排队情况】`
    this.bot.speak(speakResult, this.message);
  }
  error() {
    throw new Error('主动抛出错误')
  }
  setMessage() {
    this.message = this.bot.contextIsolate.message;
  }
}