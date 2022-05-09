import axios from "axios";
import { Bot } from "node-core/instance/types";
import { base } from "../../base";
import fs from "fs";
import Mirai, { message } from "node-mirai-sdk";
const { Group } = Mirai.Target
import botConfig from "@/config/bot.config.json";
export class dailyPaper implements base {
  static instruction = "日报";
  bot: Bot;
  params: any;
  qqGroup:number
  constructor(bot) {
    this.bot = bot;
    this.qqGroup=Number(botConfig.timer.group)
  }
  async action() {
    await this.prepareData();
    this.send()
  }
  async actionInTimer(){
    // await this.prepareData();
    this.sendInTimer();
  }
  async prepareData(){
    const imgData = await this.getData();
    await this.store(imgData);
  }
  async getData() {
    const url = await axios
      .get("http://api.soyiji.com//news_jpg",{ headers: { Referer: "safe.soyiji.com" }})
      .then((res) => {
        return res.data.url;
      });

    const imgData = await axios
        .get(url, { headers: { Referer: "safe.soyiji.com" }, responseType:'arraybuffer'})
        .then((res) => {
            return res.data
        });
    return imgData
  }
  store(imgData) {
    return new Promise((resolve) => {
      fs.writeFile(
        `node-core/statics/img/out/paper.png`,
        imgData,
        "binary",
        (error) => {
          if (error) {
            console.log(error);
            console.log("下载失败");
          } else {
            console.log("下载成功！");
          }
          resolve(true);
        }
      );
    });
  }
  send(){
    const message=this.bot.contextIsolate.message
    this.bot.instance.sendImageMessage("node-core/statics/img/out/paper.png",message);
  }
  sendInTimer(){
    console.log('sendInTimer')
    this.bot.instance.sendImageMessage(
      "node-core/statics/img/out/paper.png",
      Group(this.qqGroup)
    );
  }
}
