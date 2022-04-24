import Mirai from "node-mirai-sdk";
const { Plain } = Mirai.MessageComponent;
//该类存储并初始化一次对话的基本信息
export class messageIsolate {
  text: string;
  message: any;
  botInstance: any;
  constructor(bot: any,message) {
    this.message = message;
    this.botInstance = bot.instance;
    this.onMessage();
  }
  onMessage() {
    const { messageChain } = this.message;
    messageChain.forEach((chain) => {
      if (chain.type === "Plain") this.text += Plain.value(chain);
      if (chain.type == "Xml") this.text += chain.xml;
    });
  }
}

export function initializeContextIsolate(bot,message) {
  return new messageIsolate(bot,message);
}
