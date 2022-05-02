/*
 * @Author: 某时橙
 * @Date: 2021-04-01 22:21:47
 * @LastEditTime: 2022-05-02 10:44:20
 * @LastEditors: Please set LastEditors
 * @Description: 请添加介绍
 * @FilePath: \node-cmm\mirai\node-core\mods\cmdMod\pa\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import { Bot } from "node-core/instance/types";
import { base } from "../../base";

let drawProxy = {
  QID: null,
  text: null,
  name: null,
  speak:null,
  init:function(speak){
    this.speak=speak
  },
  action: async function () {
    await this.draw();
    await this.store();
  },
  draw: async function () {
    return new Promise(async (resolve) => {
      let ctx = this.ctx;

      let qqHeader = await this.getImage(
        `http://q1.qlogo.cn/g?b=qq&nk=${this.QID}&s=3`
      ); //获取QQ头像;
      let image = await this.getImage(
        `code/img/pa/img (${getRandom(1, 54)}).png`
      );

      ctx.drawImage(image, 0, 0, 360, 360); //画主框

      this.drawHeader(qqHeader); //画头像

      resolve("draw finish.");
    });
  },
  store: function () {
    return new Promise((resolve) => {
      const out = fs.createWriteStream(__dirname + "node-core/statics/img/out/pa.png");
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
  origin(QID) {
    const canvas = createCanvas(360, 360);

    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;

    if (!QID) {
      this.speak("请填写ID信息");
      return false;
    }
    this.QID = QID;

    return true;
  },
  drawHeader(img) {
    let ctx = this.ctx;
    ctx.save();

    ctx.beginPath();

    let r = 30;
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.arc(30, 330, r, 0, Math.PI * 2, false);
    ctx.clip();

    ctx.drawImage(img, 0, 300, 60, 60); //画主框
    ctx.stroke();

    ctx.restore();
  },
};


function getRandom(num1, num2) {
  return Math.floor(Math.random() * (num2 - num1 + 1) + num1); // 取(0~num2-num1)+num1=num1~num2
}


export class test implements base{
    static instruction='测试'
    bot:Bot
    params:any
    constructor(bot,params){
      this.bot=bot;
      this.params=params
      drawProxy.init(this.bot.speak)
      
    }
    async action(QID) {
        const message=this.bot.contextIsolate.message
        if (!drawProxy.origin(QID)) return;
        await drawProxy.action();
        this.bot.instance.sendImageMessage("node-core/statics/img/out/pa.png",message);
      }
    error(){
      throw new Error('主动抛出错误')
    }
  }