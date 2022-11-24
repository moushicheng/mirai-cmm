import { Bot } from "@/instance/types";
import { GroupSender } from "node-mirai-sdk/types/src/typedef";
import pinyin from "pinyin";
import puppeteer from "puppeteer";
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

export function getPinyin(params){
  const result=pinyin(params,{
    style:'normal'
  });
  return result.join('')
}

export function firstToUpper(str) {
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}

async function getPage(url, options) {
  let browser;
  try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({ // 设置视窗大小
          width: options.width,
          height: options.height
      });

      await page.goto(url); // 打开页面

      await page.screenshot({ path: options.outPath }); // path: 截屏文件保存路径

      console.log('getPage success');
      await browser.close();
  } catch (err) {
      console.log('getPage fail');
      await browser.close();
      return 'error';
  }
}