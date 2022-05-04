import { getGroupId, getSenderId } from "@/helper";
import { Bot } from "../../instance/types";
const ANY = 114514;

export class responserContainer {
  store: responser[];
  constructor() {
    this.store = [];
    this.initialForGlobalResponser();
  }
  addResponser(responser: responser) {
    this.store.push(responser);
  }
  removeResponser(responser: responser) {
    const index = this.store.findIndex((responserStored: responser) => {
      responserStored === responser;
    });
    this.store.splice(index, 1);
  }
  snifferAllResponers() {
    this.store.forEach((responser) => {
      responser.run();
    });
  }
  initialForGlobalResponser() {
    global.responserContainer = this;
  }
}

export class responser {
  status: status;
  launcher: number;
  bot: Bot;
  qqGroup: number;

  constructor(bot, isGlobalMode = false) {
    this.status = null;
    this.bot = bot;

    this.launcher = ANY;
    if (!isGlobalMode) {
      this.launcher = this.bot.contextIsolate.message.sender.id;
    }
    //初始化群id
    this.qqGroup = getGroupId(bot);
    this.bot.responserContainer.addResponser(this)
  }
  changeStatus(status) {
    this.status = new status(this);
  }
  //脚本执行时机：区分场景执行run|群内or私聊
  //如果是ANY，则回答者可以是所有人，如果不是则是发起responser的人
  run() {
    if (this.qqGroup && this.qqGroup !== getGroupId(this.bot)) return;
    if (this.launcher === ANY || getSenderId(this.bot) === this.launcher) {
      this.status.run();
    }
  }
}

export interface status {
  responser: responser;
  run: () => void;
}
export class endStatus implements status {
  responser: responser;
  constructor(responer: responser) {
    this.responser = responer;
  }
  run() {
    global.responserContainer.removeResponser(this.responser);
  }
}
