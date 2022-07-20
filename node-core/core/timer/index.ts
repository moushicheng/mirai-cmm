/*
 * @Author: 某时橙
 * @Date: 2022-05-02 15:05:34
 * @LastEditTime: 2022-05-06 20:52:10
 * @Description: 请添加介绍
 * @FilePath: \mirai\node-core\core\timer\index.ts
 */
import { Bot } from "node-core/instance/types";
import Mirai from "node-mirai-sdk";
const { Image } = Mirai.MessageComponent;

import { sleep } from "@/helper/index";
import dayjs from "dayjs";
import axios from "axios";

import botConfig from "@/config/bot.config.json";
const urls: string[] = botConfig.timer.urls;

import { SyncHook } from "tapable";
import { ALL_HOUR_CLOCK } from "./const";
import { Hooks } from "./types";
import { dailyPaper, leetcode, tellTime,moyu} from "../../mods/index";
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
    new tellTime(this.bot).initTips();
  }
  initializeHook() {
    this.hooks = {
      everyHour: new SyncHook(),
    };
    ALL_HOUR_CLOCK.forEach((item) => {
      this.hooks[item] = new SyncHook();
    });
    this.hooks.everyHour.tap("报时", () => {
      new tellTime(this.bot).actionInTimer();
    });
    this.hooks["seven"].tap("力扣每日一题", () => {
      new leetcode(this.bot).actionInTimer();
    });
    this.hooks["eight"].tap("摸鱼日历", () => {
      new moyu(this.bot).actionInTimer();
    });
    this.hooks["nine"].tap("日报", () => {
      new dailyPaper(this.bot).actionInTimer();
    });
    this.hooks["two"].tap("重置一言库", () => {
      this.initTips.call(this);
    });
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
  getNextHourDelay() {
    //获取下一个整点所需要的△T
    const [hour, min, second] = dayjs()
      .format("HH:mm:ss")
      .split(":")
      .map((item) => Number(item));
    return ((59 - min) * 60 + (60 - second)) * 1000;
  }
}

function getNowHour() {
  return Number(dayjs().format("HH"));
}
