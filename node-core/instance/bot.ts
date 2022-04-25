/*
 * @Author: 某时橙
 * @Date: 2022-04-23 16:53:04
 * @LastEditTime: 2022-04-25 22:39:43
 * @Description: 请添加介绍
 * @FilePath: \mirai\node-core\instance\bot.ts
 */
import Mirai from "node-mirai-sdk";
import {
  initializeContextIsolate,
  messageIsolate,
} from "../core/contextIsolate/index";
import { instructionHandler } from "../core/instruction-handler/index";
import { responserContainer } from "../core/response";
import { Bot } from "./types";
export class bot implements Bot {
  name: string;
  instance: Mirai;
  contextIsolate: messageIsolate;
  instructionHandler: instructionHandler;
  responserContainer: responserContainer;
  constructor({ name, host, verifyKey, qq }) {
    this.name = name;
    this.instance = this.initializeForMirai({
      host,
      verifyKey,
      qq,
    });
    this.instructionHandler = new instructionHandler(this);
    this.responserContainer = new responserContainer();
  }
  private initializeForMirai({ host, verifyKey, qq }) {
    const miraiInstance = new Mirai({
      host: host,
      verifyKey: verifyKey,
      qq: qq,
      enableWebsocket: false,
    });
    // auth 认证(*)
    miraiInstance.onSignal("authed", () => {
      miraiInstance.verify();
    });
    // session 校验回调
    miraiInstance.onSignal("verified", async () => {
      // 获取好友列表，需要等待 session 校验之后 (verified) 才能调用 SDK 中的主动接口
      const friendList = await miraiInstance.getFriendList();
      console.log("@好友列表：", friendList.splice(0, 3));
    });
    return miraiInstance;
  }
  public start() {
    this.instance.onMessage(async (context) => {
      //初始化隔离交互实例
      this.contextIsolate = initializeContextIsolate(this, context);
      //执行本次交互的逻辑行为
      this.instructionHandler.run();
    });
    this.instance.listen("all");
  }
  public async speak(text, isBack = false) {
    const recovery = this.contextIsolate.message.reply(text);
    if (isBack) {
      // const content = this.contextIsolate;
      // let id = null;
      // if (content.message.type == "FriendMessage") {
      //   id = content.message.sender.id;
      // } else {
      //   id = content.message.sender.group.id;
      // }
      // if (!content.message[id]) content.message[id] = [];
      // content.message[id].push(recovery);
    }
  }
}
