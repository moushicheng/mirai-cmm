import { Bot } from "node-core/instance/types";
import { base } from "../../base";
import axios from "axios";
import cheerio from "cheerio";
import { getRandomObj } from "@/helper";
import { GroupSender } from "node-mirai-sdk/types/src/typedef";
let getCount = 0;
let allEvent = [];

export class rollEgg implements base {
  static instruction = "扭蛋";
  bot: Bot;
  params: any;
  group: number;
  constructor(bot) {
    this.bot = bot;
    if (this.bot.contextIsolate.message.type === "GroupMessage") {
      this.group = (
        this.bot.contextIsolate.message.sender as GroupSender
      ).group.id;
    } else {
      this.group = null;
    }
  }
  async action() {
    if (this.group === null) return;
    const data = await this.bot.instance.getGroupMemberList(this.group);
    
    const member = getRandomObj(data);

    if (getCount >= 10 || getCount == 0) {
      await this.getEvents();
      getCount = 0;
    }
    getCount++;
    this.bot.speak(
      `你扭到了${member.memberName},他正在${getRandomObj(allEvent)}✧( ु•⌄• )`
    );
  }
  error() {
    throw new Error("主动抛出错误");
  }
  async getEvents() {
    const { data } = await axios.get(
      "https://www.vvwen.com/tools.php?id=xSdejQlQ11wwThzoqt"
    );
    let $ = cheerio.load(data, {
      decodeEntities: false,
    });
    const _allEvent = [];
    $(".bd-content .bg-light").each(function () {
      _allEvent.push($(this).text());
    });
    allEvent = _allEvent;
  }
}
