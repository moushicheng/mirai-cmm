import { speak } from "../../../histort-code/utils";
import { list } from "../../config/instruction";
import { Bot } from "../../instance/types";
import base from "./baseHandler";
export default class cmdHandler implements base {
  bot: Bot;
  constructor(bot: Bot) {
    this.bot = bot;
  }
  public run() {
    const cmdStandard = this.makeStandard(); //处理指令格式 !指令名 参数 ->!m[0] m[1]
    let action = this.checkCmd(cmdStandard[0]); //检测指令是否存在,并返回相关函数
    action(...cmdStandard[1]); //执行指令
  }
  private makeStandard() {
    //字符串处理,使格式化
    let text = global.context.text;
    let temp = text.substr(1).split(" ");
    let instruct = temp[0];
    temp.shift(); //去指令

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
    cmd = this.findCmd(cmd);
    if (!cmd) {
      return function () {
        // speak("404 Not Found,橙萌萌也无能为力啦");
        console.log("Not Found cmd");
      };
    }
    if (this.checkBlackList(cmd)) {
      return function () {
        speak("你被扣在了罐子里,联系时橙来解禁吧");
      };
    }
    if (!this.checkWhiteList(cmd)) {
      //不在白名单内，则不给通过
      return function () {
        speak("你被扣在了罐子里,联系时橙来解禁吧");
      };
    }
    return ()=>{} //返回指令执行函数这里
  }
  checkBlackList(cmd) {
    let b = list[cmd].blackList;
    let msg = global.context.msg;
    if (!b) return false;
    for (const groupId of b.group) {
      //群内发言时
      if (msg.type != "GroupMessage") break;
      if (msg.sender.group.id == groupId) {
        return true;
      }
    }
    for (const uid of b.friend) {
      //私聊+群内发言
      if (msg.sender.id == uid) {
        return true;
      }
    }
    return false;
  }
  checkWhiteList(cmd) {
    //true代表通过，false代表不通过
    let w = list[cmd].whiteList;
    let msg = global.context.msg;
    if (!w) return true; //没有白名单，则说明全过
    for (const groupId of w.group) {
      //群内发言时
      if (msg.type != "GroupMessage") break;
      if (msg.sender.group.id == groupId) {
        return true;
      }
    }
    for (const uid of w.friend) {
      //私聊+群内发言
      if (msg.sender.id == uid) {
        return true;
      }
    }
    return false;
  }
  findCmd(name) {
    if (list[name]) return name;
    for (const [cmdName, cmdInfo] of Object.entries(list)) {
      if (cmdInfo.alias == name) {
        return cmdName;
      }
    }
    return null;
  }
}
