/*
 * @Author: your name
 * @Date: 2021-02-25 15:29:03
 * @LastEditTime: 2022-05-04 23:31:51
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \mirai\node-core\config\instruction.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */

import { acidTest } from "@/mods";

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
export const GlobalBlackList = [1518503928];
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
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  help: {
    alias: ["帮助"],
    recommend: "查看帮助列表",
    format: "!帮助 [指令名]",
    example: "!帮助 天气查询",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  fishc: {
    alias: ["fishc,fish,fis,fi,小甲鱼论坛,小甲鱼,论坛"],
    recommend: "fishc",
    format: "!fishc",
    example: "!fishc",
  },
  photoQuery: {
    alias: ["以图搜图", "识图"],
    recommend: "识别图像出处",
    format: "!识图",
    example: "!识图",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  nonsenseCreate: {
    alias: ["狗屁不通文章生成器", "狗屁不通", "gpbt", "gp"],
    recommend: "生成狗屁不通文",
    format: "!狗屁不通 [主题]",
    example: "!狗屁不通 考研",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  cpStory: {
    recommend: "生成cp故事",
    format: "!cp [角色A] [角色B]",
    example: "!cp 张三 李四",
    alias: ["cp故事", "cp"],
    blackList:{
      group:[732602651,734117471,626703161],
    }
  },
  roll: {
    alias: ["投骰子"],
    recommend: "投骰子~ 【1】d【6】指投6面骰子1次",
    format: "!roll [参数]",
    example: "!roll 2d8 ->投8面骰子2次",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  rollEgg: {
    alias: ["扭蛋"],
    recommend: "扭蛋,从随机群友中挑选一位（",
    format: "!扭蛋",
    example: "!扭蛋",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  rua: {
    alias: ["谣言生成器", "rua"],
    recommend: "P聊天记录图",
    format: "!rua qq号 昵称 内容",
    example: "!rua 114514 橙萌萌 我爱中华",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  pa: {
    alias: ["爬"],
    recommend: "让某位群友爬",
    format: "!爬 [id]",
    example: "!爬 114514",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  git: {
    alias: ["git", "git搜索"],
    recommend: "搜索github",
    format: "!git [库名] [语言?]   ?代表可选",
    example: "!git mirai javascript\ngit Vue",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  scriptRun: {
    alias: ["脚本执行器"],
    recommend: "执行脚本",
    format: "!run",
    example: "!run <return '草'>",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  oneSpeakAdd: {
    alias: ["一言添加"],
    recommend: "向报时数据库添加一言",
    format: "!一言添加 内容",
    example: "!一言添加 114514",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  oneSpeakWithdraw: {
    alias: ["一言撤回"],
    recommend: "在数据库中撤回最近的一条一言",
    format: "!一言撤回",
    example: "!一言撤回",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  oneSpeakQuery: {
    alias: ["一言查询"],
    recommend: "查询在数据库中一言",
    format: "!一言查询 <内容>",
    example: "!一言查询 狒狒",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  oneSpeakDelete: {
    alias: ["一言删除"],
    recommend: "删除在数据库中一言",
    format: "!一言删除 <下标>",
    example: "!一言删除 0",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  demonstration: {
    alias: ["超精确数字论证器", "论证"],
    recommend: "论证恶臭数字",
    format: "!论证 <Number>",
    example: "!论证 114514",
    blackList:{
      group:[732602651,734117471,626703161]
    }
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
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  leetcode: {
    alias: ["力扣","每日一题"],
    recommend: "推送力扣每日一题",
    format: "!力扣",
    example: "!力扣",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  moyu:{
    alias: ["摸鱼","摸鱼人日历","日历"],
    recommend: "推送摸鱼人日历",
    format: "!摸鱼",
    example: "!摸鱼",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  tellTime:{
    alias: ["报时","整点报时"],
    recommend: "整点报时",
    format: "!报时",
    example: "!报时",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  mixEmoji:{
    alias: ["合成"],
    recommend: "合成emoji",
    format: "!合成 emoji1 emoji2",
    example: "!合成",
    blackList:{
      group:[732602651,734117471,626703161]
    }
  },
  // setu:{
  //   alias: ["setu","涩图","st"],
  //   recommend: "涩图，加关键字可以定向随机检索",
  //   format: "!涩图 [关键词]",
  //   example: "!涩图",
    
  // },
  acidTest:{
    alias: ["queue","核酸","hs","排队情况"],
    recommend: "查看核酸排队情况",
    format: "!核酸",
    example: "!核酸",
  },
  chatgpt:{
    alias: ["聊天","lt","l","查","问"],
    recommend: "聊天",
    format: "!聊天",
    example: "!聊天",
  }
};
