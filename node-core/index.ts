import { bot } from "./instance/bot";

const cmm = new bot({
  name: "橙萌萌",
  host: "http://127.0.0.1:8080",
  verifyKey: "114514233",
  qq: 2810704613,
});
//全局定义一下，方便调用（可能
global.bot=cmm;
cmm.start();
// 退出前向 mirai-http-api 发送释放指令(*)
process.on("exit", () => {
  cmm.instance.release();
});
