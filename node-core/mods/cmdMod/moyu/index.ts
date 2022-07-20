import axios from "axios";
import { Bot, Message } from "node-core/instance/types";
import { base } from "../../base";
import Mirai from "node-mirai-sdk";
const { Plain, Image } = Mirai.MessageComponent;
const group = [];

export class moyu implements base {
  static instruction = "摸鱼日历";
  bot: Bot;
  params: any;
  message: Message;
  constructor(bot) {
    this.bot = bot;
  }
  async action() {
    this.setMessage();
    const url = await this.getUrl();
    this.bot.speak(
      [
        Image({
          url,
        }),
      ],
      this.message
    );
  }
  async actionInTimer() {
    const url = await this.getUrl();
    group.forEach((groupId) => {
      this.bot.instance.sendGroupMessage(
        [
          Image({
            url,
          }),
        ],
        groupId
      );
    });
  }
  getUrl() {
    return axios
      .get("https://api.j4u.ink/v1/store/other/proxy/remote/moyu.json")
      .then((res) => {
        return res.data.data["moyu_url"];
      });
  }
  setMessage() {
    this.message = this.bot.contextIsolate.message;
  }
}
