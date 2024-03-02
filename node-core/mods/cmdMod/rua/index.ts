/*
 * @Author: 某时橙
 * @Date: 2021-03-29 11:28:56
 * @LastEditTime: 2022-05-02 10:43:46
 * @LastEditors: Please set LastEditors
 * @Description: 请添加介绍
 * @FilePath: \node-cmm\mirai\node-core\mods\cmdMod\rua\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import { Bot } from "node-core/instance/types";
import { base } from "../../base";

const drawProxy = {
  QID: null,
  text: null,
  name: null,
  action: async function () {
    await this.draw();
    await this.store();
    console.log("finish this draw progress");
  },
  draw: async function () {
    return new Promise(async (resolve) => {
      const ctx = this.ctx;
      const qqHeader = await this.getImage(
        `http://q1.qlogo.cn/g?b=qq&nk=${this.QID}&s=3`
      ); //获取QQ头像
      const image = await this.getImage("node-core/statics/img/main.png"); //获取PS主框
      ctx.drawImage(qqHeader, 6, 9, 30, 30); //画头像
      ctx.drawImage(image, 0, 0, 359, 82); //画主框

      this.drawID(); //画id

      await this.drawContextFrame(); //画框

      this.drawContext(); //画内容

      resolve("draw finish.");
    }).catch((err) => {
      console.log(err);
    });
  },
  store: function () {
    return new Promise((resolve) => {
      const out = fs.createWriteStream("node-core/statics/img/out/ps.png");
      const stream = this.canvas.createPNGStream();
      stream.pipe(out);
      out.on("finish", () => {
        resolve("The PNG file was created.");
      });
    });
  },
  getImage: function (url) {
    return loadImage(url).then((image) => {
      return image;
    });
  },
  origin({ QID, text, name }) {
    const canvas = createCanvas(359, 82);
    const ctx = canvas.getContext("2d");
    this.QID = QID;
    this.text = text;
    this.name = name;
    this.ctx = ctx;
    this.canvas = canvas;
    if (!QID || !text || !name) {
      return false;
    }
    // if (text.length >= 25) {
    //   return false;
    // }
    return true;
  },
  drawID() {
    let ctx = this.ctx;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.font = "12px Microsoft YaHei, Songti SC";
    ctx.fillText(this.name, 50, 8 + 12);
  },
  drawContext() {
    let ctx = this.ctx;
    ctx.fillStyle = "Black";
    ctx.font = "550 16px Microsoft YaHei, Songti SC";
    ctx.fillText(this.text, 56, 37 + 16);
  },
  async drawContextFrame() {
    return new Promise(async (res) => {
      let ctx = this.ctx;
      ctx.font = "16px Microsoft YaHei, Songti SC";
      ctx.fillStyle = "rgb(177, 195, 205)";

      const width = ctx.measureText(this.text).width;
      ctx.fillRect(56, 27, width, 41); //x,y,width,height
      const rEdge = await this.getImage("node-core/statics/img/rEdge.png"); //获取PS主框
      ctx.drawImage(rEdge, 56 + width, 27); //画主框
      ctx.stroke();
      res(true);
    });
  },
};

export class rua implements base {
  static instruction = "测试";
  bot: Bot;
  params: any;
  constructor(bot, params) {
    this.bot = bot;
    this.params = params;
  }
  async action(QID, name, text) {
    const message = this.bot.contextIsolate.message;
    if (!drawProxy.origin({ QID, text, name })) return;
    await drawProxy.action();
    this.bot.instance.sendImageMessage("node-core/statics/img/out/ps.png", message);
  }
  error() {
    throw new Error("主动抛出错误");
  }
}
