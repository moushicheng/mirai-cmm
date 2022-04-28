import { list } from "../../config/instruction";
import { Bot } from "../../instance/types";
import base from "./baseHandler";
import * as modlist from "../../mods/index";

export default class cmdHandler implements base {
  bot: Bot;
  constructor(bot: Bot) {
    this.bot = bot;
  }
  public run() {
    console.log('cmd?');
    const [instruct, params] = this.format(this.bot.contextIsolate.text); //处理指令格式 !指令名 参数 ->!m[0] m[1]
    const modName = this.checkCmd(instruct); //检测指令是否存在

    const mod = modlist[modName];
    if (!mod) {
      throw new Error("未查询到模块");
    }
    mod.action(...params);
  }
  private format(text) {
    //字符串处理,使格式化
    const temp = text.trim().substr(1).split(" ");
    const instruct = temp[0];
    temp.shift(); //去掉

    let params = temp;
    params = this.mergeLongParams(params); //转化<>类型参数
    params = params.filter((item) => item != ""); //去掉多余空格参数

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
    cmd = this.getOriginCmd(cmd); //返回指令名（因为可能是别名）
    if (!cmd) return;
    const blackList = list[cmd].blackList;
    const whiteList = list[cmd].whiteList;

    if (this.checkList(blackList) === true) {
      this.bot.speak("你被扣在了黑罐子里,联系时橙来解禁吧");
      return;
    }

    if (this.checkList(whiteList) === false) {
      this.bot.speak("你被扣在了白罐子里,联系时橙来解禁吧");
      return;
    }
    return cmd;
  }
  private checkList(list) {
    if (list === undefined) return undefined;
    const msg = this.bot.contextIsolate.message;
    for (const groupId of list.group) {
      //群内发言时
      if (msg.type != "GroupMessage") break;
      if (msg.sender.group.id == groupId) {
        return true;
      }
    }
    for (const uid of list.friend) {
      //私聊+群内发言
      if (msg.sender.id == uid) {
        return true;
      }
    }
    return false;
  }
  private getOriginCmd(name) {
    if (list[name]) return name;
    for (const [cmdName, cmdInfo] of Object.entries(list)) {
      if (cmdInfo.alias == name) {
        return cmdName;
      }
    }
    throw new Error("404 command: " + name);
    return null;
  }
}