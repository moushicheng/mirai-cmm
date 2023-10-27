
import path from 'path'
import Koa,{ Context, Next } from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
const moduleAlias = require('module-alias')
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
 

//通知模块
const app = new Koa();
const router = new Router();
//转换body请求参数
app.use(bodyParser());


//router配置中间件
app.use(router.routes());
app.use(router.allowedMethods());
router.post('/wx', (ctx: Context,next:Next)=>{
  const url: string = ctx.request.body.url
  try{
    console.log('url')
    cmm.instance.sendFriendMessage(url,1163675107)
    cmm.instance.sendFriendMessage(url,993228281)
  }catch(err){
    console.log('发送失败')
  }
  ctx.body='hello'
  next();
})


app.listen(3000);