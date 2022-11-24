/*
 * @Author: moushicheng 1163675107@qq.com
 * @Date: 2022-05-08 15:38:29
 * @LastEditors: moushicheng 1163675107@qq.com
 * @LastEditTime: 2022-05-18 16:54:48
 * @FilePath: \mirai\node-core\core\response\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getGroupId, getSenderId } from "@/helper";
import { message } from "node-mirai-sdk";
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
  curMessage:message
  [key:string]:any;
  constructor(bot,message?, isGlobalMode = false) {
    this.status = null;
    this.bot = bot;

    this.launcher = ANY;
    if (!isGlobalMode) {
      this.launcher = this.bot.contextIsolate.message.sender.id;
    }
    //初始化群id
    this.qqGroup = getGroupId(this.bot);
    this.bot.responserContainer.addResponser(this)  
    //固定message。防止异步丢失;
    this.curMessage=message?message:this.bot.contextIsolate.message
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
