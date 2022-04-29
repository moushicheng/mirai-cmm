import Mirai, { message } from "node-mirai-sdk";
import { Bot } from "../../instance/types";
const { Plain } = Mirai.MessageComponent;
//该类存储并初始化一次对话的基本信息
export class messageIsolate {
  text: string;
  message:  message
  botInstance: Mirai
  constructor(bot: Bot,message) {
    this.message = message;
    this.botInstance = bot.instance;
    this.text=''
    this.onMessage();
  }
  onMessage() {
    const { messageChain } = this.message;
    messageChain.forEach((chain) => {
      if (chain.type === "Plain") this.text += chain.text
      if (chain.type == "Xml") this.text += chain.xml;
    });
  }
}

export function initializeContextIsolate(bot,message) {
  return new messageIsolate(bot,message);
}
