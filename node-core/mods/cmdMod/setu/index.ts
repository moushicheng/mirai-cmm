import { getRandomObj } from "@/helper";
import axios from "axios";
import { Bot } from "node-core/instance/types";
import { base } from "../../base";
import { Canvas, createCanvas, Image, loadImage } from "canvas";
import fs from "fs";
import { message } from "node-mirai-sdk/types/src/typedef";
export class setu implements base {
  static instruction = "setu";
  bot: Bot;
  params: any;
  message: message;
  canvas: Canvas;
  type: string;
  constructor(bot, params) {
    this.bot = bot;
    this.params = params;
    this.setMessage();
  }
  async action(...query) {
    const queryFormatted = this.formamattedQuery(query);

    const res = await axios.get(
      "https://api.lolicon.app/setu/v2?size=regular" + queryFormatted
    );
    console.log(
      "https://api.lolicon.app/setu/v2?size=regular" + queryFormatted
    );
    console.log(
      "https://api.lolicon.app/setu/v2?size=regular" + queryFormatted
    );
    let url: any = Object.values(getRandomObj(res.data.data).urls)[0];
    this.type = url.split(".").pop();

    this.bot.speak(url, this.message);
    const setuData = await this.getImageData(url);

    await this.transformImage(setuData);
    const transformResultUrl = await this.storeImage();
    this.sendImage(transformResultUrl);
  }
  formamattedQuery(query) {
    const defaultQuery = {
      r18: 1,
      uid: null,
      keyword: null,
      tag: null,
    };
    let res: any = [];

    if (query.length == 1 && !findKey(query[0].split("=")[0])) {
      //简单用法
      res.push("keyword=" + query.pop());
    } else {
      //高级用法
      for (let i = 0; i < query.length; i++) {
        const cur = query[i];
        const [key, val] = cur.split("=");
        if (findKey(key)) {
          defaultQuery[key] = val;
        }
      }
    }
    Object.entries(defaultQuery).forEach((item) => {
      const [key, val] = item;
      if (val) {
        res.push(`${key}=${val}`);
      }
    });
    if (res.length > 0) {
      res = "&" + res.join("&");
    } else {
      res = "";
    }
    function findKey(key) {
      return (
        Object.keys(defaultQuery).findIndex((item) => {
          return key == item;
        }) > -1
      );
    }
    return res;
  }
  error() {
    throw new Error("主动抛出错误");
  }
  setMessage() {
    this.message = this.bot.contextIsolate.message;
  }
  async getImageData(url) {
    console.log("setu获取中", url);
    const res = await loadImage(url);
    console.log("setu获取成功\n");
    return res;
  }
  async storeImage() {
    const storeUrl = "node-core/statics/img/out/setu." + this.type;
    const out = fs.createWriteStream(storeUrl);
    const stream = this.canvas.createPNGStream();
    stream.pipe(out);
    console.log("setu存储成功");
    return storeUrl;
  }
  async transformImage(img: Image) {
    this.canvas = createCanvas(img.width, img.height);
    const ctx = this.canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 4, 4);
    ctx.stroke();
    console.log("setu转换成功");
  }
  sendImage(url) {
    console.log("setu发送ing...", url);
    this.bot.instance.sendImageMessage(url, this.message);
  }
}
