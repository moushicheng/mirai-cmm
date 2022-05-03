/*
 * @Author: 某时橙
 * @Date: 2022-05-02 15:05:34
 * @LastEditTime: 2022-05-03 10:04:39
 * @Description: 请添加介绍
 * @FilePath: \node-cmm\mirai\node-core\helper\timer.ts
 */
import { Bot } from "node-core/instance/types";
import Mirai from "node-mirai-sdk";
const { Plain,Image} = Mirai.MessageComponent;
import { getRandomObj, sleep } from "./index";
import dayjs from "dayjs";
import axios from "axios";
import localOneSpeak from "../config/oneSpeak.json";

const urls: string[] = [
  "https://s1.ax1x.com/2022/04/08/LC51wn.png",
  "https://s1.ax1x.com/2022/04/08/LC5les.png",
  "https://s1.ax1x.com/2022/04/08/LC5KyQ.png",
  "https://s1.ax1x.com/2022/04/08/LC5MLj.png",
  "https://s1.ax1x.com/2022/04/08/LC5uQg.png",
  "https://s1.ax1x.com/2022/04/08/LC5nSS.png",
  "https://s1.ax1x.com/2022/04/08/LC5eW8.png",
  "https://s1.ax1x.com/2022/04/08/LC5ZJf.png",
  "https://s1.ax1x.com/2022/04/08/LC5VFP.png"
];

export class timer {
  bot: Bot;
  qqGroup: number;
  tips: string[];
  constructor(bot) {
    this.bot = bot;
    this.qqGroup = 453553841;
    this.tips = [];
    this.init();
    this.run();
  }
  async run() {
    while (1) {
      let t = this.getNextHourDelay();
      if (!t) {
        await sleep(1000 * 60 * 60);
        continue;
      }
      await sleep(t);
      await this.报时();
      await sleep(10000); //防止死循环报时
    }
  }
  报时() {
    this.bot.instance.sendGroupMessage(
      [
        Image({
          url: getRandomObj(urls),
        }),
        Plain(
          `橙萌萌报时:${dayjs().format("YYYY-MM-DD HH:")}00:00
          `
        ),
      ],
      this.qqGroup
    );
  }
  getNextHourDelay() {
    //获取下一个整点所需要的△T
    const [hour, min, second] = dayjs()
      .format("HH:mm:ss")
      .split(":")
      .map((item) => Number(item));

    if (hour <= 6 && hour >= 1) {
      return false;
    }
    return ((59 - min) * 60 + (60 - second)) * 1000;
  }
  async init() {
    const onlineOneSpeak = await this.getOnlineOneSpeak();
    this.tips = [...localOneSpeak, ...onlineOneSpeak];
  }
  getOnlineOneSpeak() {
    const selectionSenType = getRandomObj("abcdefghijkl".split(""));
    return axios
      .get(
        `https://cdn.jsdelivr.net/gh/hitokoto-osc/sentences-bundle@1.0.55/sentences/${selectionSenType}.json`
      )
      .then((res) => {
        let result = [];
        if (res.data) {
          res.data.forEach((item, index) => {
            const sentence = item.hitokoto + "\n" + "from: " + item.from;
            result.push(sentence);
          });
        }

        return result;
      });
  }
}
