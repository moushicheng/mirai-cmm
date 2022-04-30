const moduleAlias = require('module-alias')
import path from 'path'
moduleAlias.addAlias('@',path.resolve(__dirname,'../node-core'))


import { bot } from "./instance/bot";
import config from "./config/bot.config.json";



const cmm=new bot({
  name: config.name,
  host: config.host,
  verifyKey: config.verifyKey,
  qq: config.qq,
})
cmm.start();
process.on("uncaughtException",async (error)=>{
  console.log('崩溃了：\n',error);
})

// 退出前向 mirai-http-api 发送释放指令(*)
process.on("exit", () => {
  cmm.instance.release();
});
 