/*
 * @Author: 某时橙
 * @Date: 2022-05-02 15:05:34
 * @LastEditTime: 2022-05-06 15:31:03
 * @Description: 请添加介绍
 * @FilePath: \mirai\node-core\helper\timer.ts
 */
import { Bot } from "node-core/instance/types";
import Mirai from "node-mirai-sdk";
const { Plain, Image } = Mirai.MessageComponent;

import { getRandomObj, sleep } from "./index";
import dayjs from "dayjs";
import axios from "axios";

import localOneSpeak from "../config/oneSpeak.json";
import botConfig from "../config/bot.config.json";
const urls: string[] = botConfig.timer.urls;

import { SyncHook } from "tapable";

const ONE_HOUR=1000 * 60 * 60;
export class timer {
  bot: Bot;
  qqGroup: number;
  tips: string[];
  hooks: any;
  constructor(bot) {
    this.bot = bot;
    this.qqGroup = botConfig.timer.group;
    this.tips = [];
    this.hooks = {
      hour: new SyncHook() ,
    };  
    this.init();
    this.everyHourRun();
  }
  async init() {
    this.tips = await getTips();
    this.hooks.hour.tap("报时", ()=>{
      this.tellTime.call(this);
    });
  }
  async everyHourRun() {
    while (1) {
      let t = this.getNextHourDelay();
      if (!t) {
        await sleep(ONE_HOUR);
        continue;
      }
      await sleep(t);
      this.hooks.hour.call();
      await sleep(10000); //防止死循环bug
    }
  }
  tellTime() {
    this.bot.instance.sendGroupMessage(
      [
        Image({
          url: getRandomObj(urls),
        }),
        Plain(
          `橙萌萌报时:${dayjs().format("YYYY-MM-DD HH:")}00:00
${getRandomObj(this.tips)}`
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
}

async function getTips() {
  const onlineOneSpeak = await getOnlineOneSpeak();
  return [...localOneSpeak, ...onlineOneSpeak];
}

function getOnlineOneSpeak() {
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
