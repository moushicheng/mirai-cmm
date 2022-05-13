/*
 * @Author: 某时橙
 * @Date: 2021-05-06 22:01:09
 * @LastEditTime: 2022-05-13 20:41:25
 * @LastEditors: moushicheng 1163675107@qq.com
 * @Description: 请添加介绍
 * @FilePath: \node-cmm\mirai\node-core\mods\cmdMod\oneSpeak\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import fs from "fs"
const url= "node-core/config/oneSpeak.json" 
import { Bot } from "node-core/instance/types";
import { base } from "../../base";

export class oneSpeakAdd implements base {
  static instruction = "一言添加";
  bot: Bot;
  constructor(bot) {
    this.bot = bot;
  }
  action(text) {
    fs.readFile(url, "utf8", (_, data) => {
        console.log(data);
      let _data = JSON.parse(data);
       _data.push(text);
      data = JSON.stringify(_data);
      fs.writeFile(url,data, () => {
        this.bot.speak("一言添加成功");
      });
    });
  }
}

export class oneSpeakQuery implements base {
  static instruction = "一言查询";
  bot: Bot;
  constructor(bot) {
    this.bot = bot;
  }
  action(content) {
    fs.readFile(url, "utf8", (err, data) => {
      let res = [];

      JSON.parse(data).forEach((item, index) => {
        if (item == null) return;
        if (item.match(content)) {
          res.push(index + "." + item + "\n");
        }
      }); 
      this.bot.speak(res.join(""));
    });
  }
}

export class oneSpeakDelete implements base {
  static instruction = "一言删除";
  bot: Bot;
  constructor(bot) {
    this.bot = bot;
  }
  action(index) {
    fs.readFile(url, "utf8", (err, data:any) => {
      data = JSON.parse(data);
      data.splice(index, 1);
      data = JSON.stringify(data);
      fs.writeFile(url, data, (err) => {
        this.bot.speak("一言删除成功");
        //文件写入成功。
      });
    });
  }
}