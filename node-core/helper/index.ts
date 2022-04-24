
export async function speak(text, msg = null, isBack = false) {
  let recovery = null;

  if (msg) recovery = await msg.reply(text);
  else recovery = await global.context.msg.reply(text);

  if (isBack) {
    pushMsg(recovery);
  }
}
function pushMsg(r) {
    const c = global.context;
    let id = null;
    if (c.msg.type == "FriendMessage") {
      id = c.msg.sender.id;
    } else {
      id = c.msg.sender.group.id;
    }
    if (!c.msgs[id]) c.msgs[id] = [];
    c.msgs[id].push(r);
  }
/**
 * @description: 获取一个数组中的随机元素
 * @param1 {*}
 * @return {*}
 * @detail:
 */
export function getRandomObj(obj, len = null) {
  let length = len ? len : obj.length;
  let num = Math.random();
  num = Math.ceil(num * length) - 1;
  if (num < 0) num = 0;
  return obj[num];
}

/**
 * @description: 随机取num1~num2中间的数字
 * @param1 {*}
 * @return null
 * @detail:
 * @param number num1
 * @param number num2
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
