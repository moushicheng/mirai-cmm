import dayjs from "dayjs";
import axios from "axios";

import { base } from "../../base";
import localOneSpeak from "@/config/oneSpeak.json";

import { getRandomObj } from "@/helper";

import { Bot, Message } from "node-core/instance/types";
import Mirai from "node-mirai-sdk";
const { Plain, Image } = Mirai.MessageComponent;

const urls = [
  "https://s1.ax1x.com/2022/04/08/LC51wn.png",
  "https://s1.ax1x.com/2022/04/08/LC5les.png",
  "https://s1.ax1x.com/2022/04/08/LC5KyQ.png",
  "https://s1.ax1x.com/2022/04/08/LC5MLj.png",
  "https://s1.ax1x.com/2022/04/08/LC5uQg.png",
  "https://s1.ax1x.com/2022/04/08/LC5nSS.png",
  "https://s1.ax1x.com/2022/04/08/LC5eW8.png",
  "https://s1.ax1x.com/2022/04/08/LC5ZJf.png",
  "https://s1.ax1x.com/2022/04/08/LC5VFP.png",
  "https://s1.ax1x.com/2022/10/04/xlGrjK.png"
];
let tips = [];
const groups = [];

export class tellTime implements base {
  static instruction = "报时";
  bot: Bot;
  params: any;
  message: Message;
  constructor(bot) {
    this.bot = bot;
  }
  async action() {
    this.setMessage();
    if (tips.length == 0) await this.initTips();
    const hour = getNowHour();
    if (hour <= 6 && hour >= 1) {
      return false;
    }

    this.bot.speak(
      [
        Image({
          url: getRandomObj(urls),
        }),
        Plain(
          `橙萌萌报时:${dayjs().format("YYYY-MM-DD HH:")}00:00
${getRandomObj(tips)}`
        ),
      ],
      this.message
    );
  }
  async actionInTimer() {
    if (tips.length == 0) await this.initTips();
    const hour = getNowHour();

    if (hour <= 6 && hour >= 1) {
      return false;
    }
    groups.forEach((groupId) => {
      this.bot.instance.sendGroupMessage(
        [
          Image({
            url: getRandomObj(urls),
          }),
          Plain(
            `橙萌萌报时:${dayjs().format("YYYY-MM-DD HH:")}00:00
${getRandomObj(tips)}`
          ),
        ],
        groupId
      );
    });
  }
  async initTips() {
    const onlineOneSpeak = await getOnlineOneSpeak();
    tips = [...localOneSpeak, ...onlineOneSpeak];
  }
  setMessage() {
    this.message = this.bot.contextIsolate.message;
  }
}
function getNowHour() {
  return Number(dayjs().format("HH"));
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
    })
    .catch((err) => {
      return [];
    });
}
