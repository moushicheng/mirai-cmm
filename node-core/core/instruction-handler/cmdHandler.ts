import { Administrator, list } from "../../config/instruction";
import { Bot } from "../../instance/types";
import base from "./baseHandler";
import * as modList from "../../mods/index";
import { GroupSender } from "node-mirai-sdk/types/src/typedef";

export default class cmdHandler implements base {
  bot: Bot;
  constructor(bot: Bot) {
    this.bot = bot;
  }
  public run() {
    const [instruct, params] = this.format(this.bot.contextIsolate.text); //处理指令格式 !指令名 参数 ->!m[0] m[1]
    const modName = this.checkCmd(instruct); //检测指令是否存在

    const mod = modList[modName];
    console.log(mod);
    if (!mod) {
      return;
    }
    new mod(this.bot,...params).action(...params);
  }
  private format(text) {
    //字符串处理,使格式化
    const temp = text.trim().substr(1).trim().split(" ");
    const instruct = temp[0];
    temp.shift(); //去掉

    let params = temp;
    params = this.mergeLongParams(params); //转化<>类型参数
    params = params.filter((item) => item != ""); //去掉多余空格参数
    console.log([instruct, params]);
    return [instruct, params];
  }
  private mergeLongParams(params) {
    for (let i in params) {
      let str = params[i];
      const leftBracketSite = str.split("").findIndex((item) => item == "<");
      const rightBracketSite =
        str.length -
        1 -
        str
          .split("")
          .reverse()
          .findIndex((item) => item == ">");
      if (rightBracketSite >= leftBracketSite) {
        str = str.split("");
        str[rightBracketSite] = "";
        str[leftBracketSite] = "";
        str = str.join("");
      }
      params[i] = str;
    }
    return params;
  }
  private checkCmd(cmd) {
    //检测指令,返回指令函数
    cmd = this.getOriginCmd(cmd); //返回指令正名，别名替换成正名
    if (!cmd) return;
    const senderId = this.bot.contextIsolate.message.sender.id;
    if (Administrator.includes(senderId)) {
      return cmd;
    }
    const blackList = list[cmd].blackList;
    const whiteList = list[cmd].whiteList;

    if (this.checkList(blackList) === true) {
      this.bot.speak("你被扣在了黑罐子里,联系时橙来解禁吧");
      throw new Error(
        `当前用户：${this.bot.contextIsolate.message.sender.id}在黑名单,指令：${cmd}`
      );
    }

    if (this.checkList(whiteList) === false) {
      this.bot.speak("你被扣在了白罐子里,联系时橙来解禁吧");
      throw new Error(
        `当前用户：${this.bot.contextIsolate.message.sender.id}不在白名单,指令：${cmd}`
      );
    }
    return cmd;
  }
  private checkList(list) {
    if (list === undefined) return undefined;
    const msg = this.bot.contextIsolate.message;
    if (list.group && msg.type === "GroupMessage") {
      for (const groupId of list.group) {
        if ((msg.sender as GroupSender).group.id == groupId) {
          return true;
        }
      }
    }
    if (list.friend) {
      for (const uid of list.friend) {
        //私聊+群内发言
        if (msg.sender.id == uid) {
          return true;
        }
      }
    }

    return false;
  }
  private getOriginCmd(name) {
    if (list[name]) return name;
    for (const [cmdName, cmdInfo] of Object.entries(list)) {
      const alias = cmdInfo.alias;
      if (typeof alias === "string" && cmdInfo.alias == name) {
        return cmdName;
      }
      if (typeof alias === "object" && cmdInfo.alias.includes(name)) {
        return cmdName;
      }
    }
    console.warn('no find: '+name)
  }
}
