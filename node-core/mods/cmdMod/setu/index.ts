import { getRandomObj } from "@/helper";
import axios from "axios";
import { Bot, Message } from "node-core/instance/types";
import { base } from "../../base";
import Mirai from "node-mirai-sdk";
const { Image,Forward } = Mirai.MessageComponent;
export class setu implements base {
  static instruction = "setu";
  bot: Bot;
  params: any;
  message: Message;
  constructor(bot, params) {
    this.bot = bot;
    this.params = params;
  }
  async action(query) {
    const queryFormatted = query ? "?" + query : "";
    const res = await axios.get(
      "https://api.lolicon.app/setu/v2" + queryFormatted
    );
    const url = getRandomObj(res.data.data).urls.original;
    console.log(url);
    this.bot.speak(url, this.message);
    const forwardMessage = [
      Forward([
        {
          senderId: 1163675107, // QQ号
          senderName: this.bot.name, // 显示名称
          time: Math.floor(Date.now() / 1000), // 时间戳以秒为单位
          messageChain:  [Image({url}),
          ],
        },
      ]),
    ];
    const r=await this.bot.speak(forwardMessage,this.message)
     this.bot.speak(
      [
        Image({
          url,
        }),
      ],
      this.message
    );
    console.log(r);
  }
  error() {
    throw new Error("主动抛出错误");
  }
  setMessage() {
    this.message = this.bot.contextIsolate.message;
  }
}
