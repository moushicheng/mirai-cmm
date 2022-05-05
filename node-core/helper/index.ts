import { Bot } from "@/instance/types";
import { GroupSender } from "node-mirai-sdk/types/src/typedef";

/**
 * @description: 获取一个数组中的随机元素
 */
export function getRandomObj(obj: any[], len = null): any {
  let length = len ? len : obj.length;
  let num = Math.random();
  num = Math.ceil(num * length) - 1;
  if (num < 0) num = 0;
  return obj[num];
}

/**
 * @description: 随机取num1~num2中间的数字
 */
export function getRandom(num1, num2) {
  return Math.floor(Math.random() * (num2 - num1 + 1) + num1); // 取(0~num2-num1)+num1=num1~num2
}

export function sleep(t) {
  //以h为单位
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, t);
  });
}

export function getGroupId(bot: Bot) {
  if (bot.contextIsolate.message.type === "GroupMessage") {
   return (bot.contextIsolate.message.sender as GroupSender).group.id;
  }
  return null;
}

export function getSenderId(bot:Bot){
  return  bot.contextIsolate.message.sender.id
}