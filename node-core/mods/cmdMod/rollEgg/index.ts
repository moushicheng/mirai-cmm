import { Bot } from "node-core/instance/types";
import { base } from "../../base";
import axios from "axios";
import cheerio from "cheerio";
import { getRandomObj } from "@/helper";
import { GroupSender } from "node-mirai-sdk/types/src/typedef";

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
    const text=await this.getRole(encodeURI(member.memberName))

    this.bot.speak(
      `你扭到了${member.memberName}(${member.id}),TA的设定如下:${text}`
    );
  }
  error() {
    throw new Error("主动抛出错误");
  }
  async getRole(name) {
    console.log(`@ADDR: https://wtf.hiigara.net/api/run/FRyRT/${name}?event=ManualRun`)
    const res = await axios.get(
      `https://wtf.hiigara.net/api/run/FRyRT/${name}?event=ManualRun`
    );
    console.log()
    return 111
  }
}
