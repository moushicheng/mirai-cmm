/*
 * @Author: your name
 * @Date: 2021-02-25 15:29:03
 * @LastEditTime: 2022-05-02 15:15:17
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \node-cmm\mirai\node-core\config\instruction.ts
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

export const GlobalBlackList = [2482109625];
export const Administrator = [1163675107];
export const list: {
  [params: string]: ListItem;
} = {
  weather: {
    alias: ['天气查询','天气',],
    recommend: "查询你所在的城市的天气",
    format: "!天气查询 [城市]",
    example: "!天气查询 深圳",
  },
  help: {
    alias:['帮助'],
    recommend: "查看帮助列表",
    format: "!帮助 [指令名]",
    example: "!帮助 天气查询",
  },
  // 色图: {
  //   alias: "涩图",
  //   recommend: "通过关键词查找涩图,若无关键词则随机涩图",
  //   format: "!涩图 [关键词]",
  //   example: "!涩图 魔理沙",
  //   blackList: {
  //     group: [209458390, 453553841, 780718903, 705314963],
  //     friend: [],
  //   },
  // },
  withdraw: {
    alias:'撤回',
    recommend: "撤回橙萌萌上一条信息",
    format: "!撤回",
    example: "!撤回",
  },
  photoQuery: {
    alias:['以图搜图','识图'],
    recommend: "识别图像出处",
    format: "!识图",
    example: "!识图",
  },
  // 记事本: {
  //   recommend: "简简单单的记事本",
  //   format: "有四条指令挖坑 填坑 埋坑 示坑,用！挖坑 指令名 来查询",
  //   example: "!帮助 挖坑",
  //   show: false,
  // },
  // 挖坑: {
  //   recommend: "设置一条新记录",
  //   format: "!挖坑 [内容] [ddl]*  - > *代表可选择的",
  //   example: "!挖坑 淦活动 4.13",
  //   show: false,
  // },
  // 填坑: {
  //   recommend: "填坑,该坑位一个月以后会消失",
  //   format: "!填坑 【坑序号】",
  //   example: "!填坑 0",
  //   show: false,
  // },
  // 埋坑: {
  //   recommend: "埋坑,直接删除该坑位",
  //   format: "!坑位 【坑序号】",
  //   example: "!填坑 0",
  //   show: false,
  // },
  // 示坑: {
  //   recommend: "展示坑位内容",
  //   format: "!坑",
  //   example: "!坑",
  //   show: false,
  // },
  nonsenseCreate: {
    alias:['狗屁不通文章生成器','狗屁不通','gpbt','gp'],
    recommend: "生成狗屁不通文",
    format: "!狗屁不通 [主题]",
    example: "!狗屁不通 考研",
  },
  cpStory: {
    recommend: "生成cp故事",
    format: "!cp [角色A] [角色B]",
    example: "!cp 张三 李四",
    alias: ["cp故事","cp"],
  },
  // "旅行萌萌[施工ing]": {
  //   recommend: "暂无",
  //   format: "暂无",
  //   example: "暂无",
  // },
  roll: {
    alias:['投骰子'],
    recommend: "投骰子~ 【1】d【6】指投6面骰子1次",
    format: "!roll [参数]",
    example: "!roll 2d8 ->投8面骰子2次",
  },
  abbrQuery: {
    alias:['缩写','sx'],
    recommend: "告诉你缩写的内容",
    format: "!缩写 [参数]",
    example: "!缩写 tmd ->他妈的",
    blackList: {
      group: [],
      friend: [],
    },
  },
  // 查看:{
  //   recommend:"查看旅行萌萌相关数据",
  //   format:"！查看 [参数]->状态or近况",
  //   example:"！查看 状态"
  // }
  rollEgg: {
    alias:['扭蛋'],
    recommend: "扭蛋,从随机群友中挑选一位（",
    format: "!扭蛋",
    example: "!扭蛋",
  },
  rua: {
    alias:['谣言生成器','rua'],
    recommend: "P聊天记录图",
    format: "!rua QID 昵称 内容",
    example: "!rua 2810704613 橙萌萌 我爱中华",
    whiteList: {

    },
  },
  pa: {
    alias:['爬'],
    recommend: "让某位群友爬",
    format: "!爬 [id]",
    example: "!爬 1163675107",
  },
  git: {
    alias:['git','git搜索'],
    recommend: "搜索github",
    format: "!git [库名] [语言?]   ?代表可选",
    example: "!git mirai javascript\ngit Vue",
  },
  scriptRun: {
    alias:['脚本执行器'],
    recommend: "执行脚本",
    format: "!run",
    example: "!run <return '草'>",
    whiteList: {
      group: [],
      friend: [1163675107],
    },
  },
  oneSpeakAdd: {
    alias:['一言添加'],
    recommend: "向报时数据库添加一言",
    format: "!一言添加 内容",
    example: "!一言添加 114514",
  },
  oneSpeakWithdraw: {
    alias:['一言撤回'],
    recommend: "在数据库中撤回最近的一条一言",
    format: "!一言撤回",
    example: "!一言撤回",
  },
  oneSpeakQuery: {
    alias:['一言查询'],
    recommend: "查询在数据库中一言",
    format: "!一言查询 <内容>",
    example: "!一言查询 狒狒",
  },
  oneSpeakDelete: {
    alias:['一言删除'],
    recommend: "删除在数据库中一言",
    format: "!一言删除 <下标>",
    example: "!一言删除 0",
    whiteList: {
      group: [],
      friend: [1163675107, 1246336370],
    },
  },
  // 一言重roll: {
  //   recommend: "重新选择一言库",
  //   format: "!一言重roll",
  //   example: "!一言重roll",
  //   show: false,
  // },
  demonstration: {
    alias: ["超精确数字论证器", "论证"],
    recommend: "论证恶臭数字",
    format: "!论证 <Number>",
    example: "!论证 114514",
  },
  // 说: {
  //   recommend: "无",
  //   format: "!说 [content]",
  //   example: "!说 你好呀，我是橙萌萌",
  // },
  test: {
    alias: "测试",
    recommend: "测试",
    format: "!测试",
    example: "!测试",
  },
  dailyPaper:{
    alias:['日报'],
    recommend: "日报",
    format: "!日报",
    example: "!日报",
  }
};
