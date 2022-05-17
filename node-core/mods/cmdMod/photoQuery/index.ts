/*
 * @Author: your name
 * @Date: 2021-03-04 19:25:45
 * @LastEditTime: 2022-05-17 20:34:02
 * @LastEditors: moushicheng 1163675107@qq.com
 * @Description:
 * @FilePath: \node-cmm\mirai\node-core\mods\cmdMod\photoQuery\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import { endStatus, responser, status } from "@/core/response";
import cheerio from "cheerio";
import Mirai from "node-mirai-sdk";
import axios from "axios";
import FormData from "form-data";
import { Bot } from "node-core/instance/types";
import { base } from "../../base";

const { Plain, Image } = Mirai.MessageComponent;

export class photoQuery implements base {
  static instruction = "识图";
  bot: Bot;
  params: any;
  id: number;
  constructor(bot) {
    this.bot = bot;
    this.id = this.bot.contextIsolate.message.sender.id;
  }
  action() {
    this.bot.speak("请发送要识别图片");
    const photoResponser = new responser(this.bot);
    photoResponser.changeStatus(startStatus);

    setTimeout(() => {
      photoResponser.changeStatus(endStatus);
    }, 1000 * 60);
  }
  error() {
    throw new Error("主动抛出错误");
  }
}

class startStatus implements status {
  responser: responser;
  constructor(responer: responser) {
    this.responser = responer;
  }
  run() {

    getResult(this.responser.bot);
    this.responser.changeStatus(endStatus);
  }
}

async function getResult(bot: Bot) {
  const url = getUrl(bot);
  if (url == undefined) return;
  const img = await getForm(url);
  const message=bot.contextIsolate.message
  axios
    .post("https://saucenao.com/search.php", img, {
      headers: img.getHeaders(),
    })
    .then((res) => {
      console.log("进行识图.....");
      let result = "";
      const $ = cheerio.load(res.data, {
        decodeEntities: false,
      });
      let url;
      let count = 0;
      $(".result").each(function () {
        if (count++ >= 3) return;
        const classText = $(this).attr("class");
        const idText = $(this).attr("id");
        if (classText && classText.includes("hidden")) return;
        if (idText && idText.includes("result-hidden-notification")) return;

        const title = $(this).find(".resulttitle").text();
        const similar = $(this).find(".resultsimilarityinfo").text();
        if (!url) url = $(this).find(".resultimage img").attr("src");
        const keys = [],
          urls = [],
          values = [];
        $(this)
          .find(".resultcontentcolumn")
          .each(function () {
            $(this)
              .children("strong")
              .each(function () {
                keys.push($(this).text());
              });
            $(this)
              .children("a")
              .each(function () {
                urls.push($(this).attr("href"));
              });
            $(this)
              .children("a")
              .each(function () {
                values.push($(this).text());
              });
          });

        result += `\n【出处${count}】
【标题】:${title}
【相似度】:${similar}`;
        for (let i = 0; i < keys.length; i++) {
          if (values[i]) result += `【${keys[i]}】:${values[i]}`;
          if (urls[i]) result += `  url:${urls[i]}`;
        }
      });
      if (result != "") {
        bot.speak([
          Image({
            url,
          }),
          Plain(result),
        ], message);
      } else {
        bot.speak("似乎没有找到(?)要不你再试试看", message);
      }
    });
}

const getForm = async (url) => {
  //mark
  // let img = await getImage(url);
  const form = new FormData();

  // #19: 当传入的 url 为 Buffer 类型时，只需指定文件名即可，此写法兼容 ReadStream；另外图片文件名的后缀类型并不会影响上传结果
  // form.append("file", img);
  form.append("url", url);
  return form;
};

function getUrl(bot: Bot) {
  let url=undefined
  bot.contextIsolate.message.messageChain.forEach((chain) => {
    console.log(chain);
    if (chain.type === "Image") url=chain.url
  });
  return url
}
