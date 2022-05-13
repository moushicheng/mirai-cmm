/*
 * @Author: 某时橙
 * @Date: 2022-05-02 15:05:34
 * @LastEditTime: 2022-05-06 20:52:10
 * @Description: 请添加介绍
 * @FilePath: \mirai\node-core\core\timer\index.ts
 */
import { Bot } from "node-core/instance/types";
import Mirai from "node-mirai-sdk";
const { Plain, Image } = Mirai.MessageComponent;

import { getRandomObj, sleep } from "@/helper/index";
import dayjs from "dayjs";
import axios from "axios";

import localOneSpeak from "@/config/oneSpeak.json";
import botConfig from "@/config/bot.config.json";
const urls: string[] = botConfig.timer.urls;

import { SyncHook } from "tapable";
import { ONE_HOUR, ALL_HOUR_CLOCK } from "./const";
import { Hooks } from "./types";
import {dailyPaper} from '../../mods/index'
export class timer {
  bot: Bot;
  qqGroup: number;
  tips: string[];
  hooks: Hooks;
  constructor(bot) {
    this.bot = bot;
    this.qqGroup = botConfig.timer.group;
    this.initTips();
    this.initializeHook();
    this.everyHourRun(); 
  }
  async initTips() {
    this.tips = await getTips();
  }
  initializeHook() {
    this.hooks = {
      everyHour: new SyncHook(),
    };
    ALL_HOUR_CLOCK.forEach((item) => {
      this.hooks[item] = new SyncHook() 
    });

    this.hooks.everyHour.tap("报时", () => {
      this.tellTime.call(this);
    });
    this.hooks["eight"].tap("摸鱼日历", () => {
      this.calendar.call(this);
    });
    this.hooks["ten"].tap("日报", () => {
      new dailyPaper(this.bot).actionInTimer()
    });
    this.hooks['two'].tap("重置一言库",()=>{
      this.initTips.call(this);
    })
  }
  async everyHourRun() {
    while (1) {
      await sleep(this.getNextHourDelay());
      //触发整点钩子
      this.hooks.everyHour.call();
      //触发特定整点的钩子
      this.hooks[ALL_HOUR_CLOCK[getNowHour()]].call();
      await sleep(10000); //防止死循环bug
    }
  }
  tellTime() {
    const hour = getNowHour();
    if (hour <= 6 && hour >= 1) {
      return false;
    }

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
    return ((59 - min) * 60 + (60 - second)) * 1000;
  }
  async calendar() {
    const url = await axios
      .get("https://api.j4u.ink/proxy/remote/moyu.json")
      .then((res) => {
        return res.data.data["moyu_url"];
      });
    this.bot.instance.sendGroupMessage(
      [
        Image({
          url,
        }),
      ],
      this.qqGroup
    );
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

function getNowHour() {
  return Number(dayjs().format("HH"));
}
