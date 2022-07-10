/*
 * @Author: your name
 * @Date: 2021-02-25 15:29:03
 * @LastEditTime: 2022-05-04 23:31:51
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \mirai\node-core\config\instruction.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */

// show：false 是否在help中展示
interface ListItem {
  alias?: string[] | string; //别名
  recommend: string; //介绍
  format: string; //指令格式
  example: string; //指令举例
  show?: boolean; //是否在helper中展示
  blackList?: {
    //黑名单
    group?: number[];
    friend?: number[];
  };
  whiteList?: {
    //白名单
    group?: number[];
    friend?: number[];
  };
}

//全局黑名单
export const GlobalBlackList = [];
//全局白名单（管理员）
export const Administrator = [];

//key必须与模组的class名一致，比如下面weather和./mods/cmdMod/weather/index.ts exports的class weather要一致，不然系统找不到模组。
export const list: {
  [params: string]: ListItem;
} = {
  weather: {
    alias: ["天气查询", "天气"],
    recommend: "查询你所在的城市的天气",
    format: "!天气查询 [城市]",
    example: "!天气查询 深圳",
  },
  help: {
    alias: ["帮助"],
    recommend: "查看帮助列表",
    format: "!帮助 [指令名]",
    example: "!帮助 天气查询",
  },
  photoQuery: {
    alias: ["以图搜图", "识图"],
    recommend: "识别图像出处",
    format: "!识图",
    example: "!识图",
  },
  nonsenseCreate: {
    alias: ["狗屁不通文章生成器", "狗屁不通", "gpbt", "gp"],
    recommend: "生成狗屁不通文",
    format: "!狗屁不通 [主题]",
    example: "!狗屁不通 考研",
  },
  cpStory: {
    recommend: "生成cp故事",
    format: "!cp [角色A] [角色B]",
    example: "!cp 张三 李四",
    alias: ["cp故事", "cp"],
  },
  roll: {
    alias: ["投骰子"],
    recommend: "投骰子~ 【1】d【6】指投6面骰子1次",
    format: "!roll [参数]",
    example: "!roll 2d8 ->投8面骰子2次",
  },
  abbrQuery: {
    alias: ["缩写", "sx"],
    recommend: "告诉你缩写的内容",
    format: "!缩写 [参数]",
    example: "!缩写 tmd ->他妈的",
  },
  rollEgg: {
    alias: ["扭蛋"],
    recommend: "扭蛋,从随机群友中挑选一位（",
    format: "!扭蛋",
    example: "!扭蛋",
  },
  rua: {
    alias: ["谣言生成器", "rua"],
    recommend: "P聊天记录图",
    format: "!rua qq号 昵称 内容",
    example: "!rua 114514 橙萌萌 我爱中华",
  },
  pa: {
    alias: ["爬"],
    recommend: "让某位群友爬",
    format: "!爬 [id]",
    example: "!爬 114514",
  },
  git: {
    alias: ["git", "git搜索"],
    recommend: "搜索github",
    format: "!git [库名] [语言?]   ?代表可选",
    example: "!git mirai javascript\ngit Vue",
  },
  scriptRun: {
    alias: ["脚本执行器"],
    recommend: "执行脚本",
    format: "!run",
    example: "!run <return '草'>",
  },
  oneSpeakAdd: {
    alias: ["一言添加"],
    recommend: "向报时数据库添加一言",
    format: "!一言添加 内容",
    example: "!一言添加 114514",
  },
  oneSpeakWithdraw: {
    alias: ["一言撤回"],
    recommend: "在数据库中撤回最近的一条一言",
    format: "!一言撤回",
    example: "!一言撤回",
  },
  oneSpeakQuery: {
    alias: ["一言查询"],
    recommend: "查询在数据库中一言",
    format: "!一言查询 <内容>",
    example: "!一言查询 狒狒",
  },
  oneSpeakDelete: {
    alias: ["一言删除"],
    recommend: "删除在数据库中一言",
    format: "!一言删除 <下标>",
    example: "!一言删除 0",
  },
  demonstration: {
    alias: ["超精确数字论证器", "论证"],
    recommend: "论证恶臭数字",
    format: "!论证 <Number>",
    example: "!论证 114514",
  },
  test: {
    alias: "测试",
    recommend: "测试",
    format: "!测试",
    example: "!测试",
  },
  dailyPaper: {
    alias: ["日报"],
    recommend: "日报",
    format: "!日报",
    example: "!日报",
  },
  leetcode: {
    alias: ["力扣","每日一题"],
    recommend: "推送力扣每日一题",
    format: "!力扣",
    example: "!力扣",
  },
};
