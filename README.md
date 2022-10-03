# welcome
橙萌萌2.0 -基于1.0重构

## for Usage
### 配置
oneSpeak.json，该配置用于报时模块的数据库
```JSON
["测试"]
```
bot.config.json，用于bot的基础配置
```JSON
    {
        "name": "机器人名字",
        "host": "http://127.0.0.1:8080", //随mirai http插件配置，可以不变
        "verifyKey": "114514233",        //随mirai http插件配置，可以不变
        "qq": 114514,                //机器人qq号
        "INSTRUCTION_SYMBOL":["!", "！"], //指令前缀              
    }
```
配置instruction.ts（指令配置）
已有基础模板，直接查看node-core/config/instruction.ts即可

详细配置项↓

```typescript
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
```



### 依赖安装(注意环境)
然后用yarn或者npm安装
```bash
yarn install //or
npm install 
```

### 环境要求
```
配置mcl:https://github.com/project-mirai/mirai-api-http （需要java
python 3.x
nodejs 16.x
配置node-canvas：https://github.com/Automattic/node-canvas 
```

### 启动
开两个控制台,先启动mcl
```
yarn mcl 
```
再启动dev
```
yarn dev
```

## QA
- TS类型报错
   
   - Image类型错误，可能node-mirai的ts类型bug，进入node_modules找node-mirai源文件中的Image，修改ImageId如下即可
   
     ```typescript
     export type image = {
         imageId?: string;
         url?: string;
     };
     ```
   
     
   
   - 其他TS报错，某些类型文件没有install成功，注意报错信息

- 可能潜在的http报错
某些功能使用到axios，会调用外部接口
外部接口可能不稳定，所以会报http错误，具体情况具体分析，但一般不会影响萌萌进程的正常运行

## 贡献指南

橙萌萌有两种类型的模组，

- 纯文本类型模组，由正则匹配

- 指令类型模组，由前缀匹配（！或者!）

举例：编写一个指令类型模组，查阅node-core/mods/cmdMod/demoMod/index.ts

speak可以简单输出信息给当前调用指令的用户

```typescript
import { Bot } from "node-core/instance/types";
import {base} from "../../base";

export class test implements base{
  static instruction='测试'
  bot:Bot
  params:any
  constructor(bot,params){
    this.bot=bot;
    this.params=params
    
  }
  action(...params){
    this.bot.speak('测试结果: '+`输入参数集${params}`)
    if(params[0]==='error')this.error()
  }
  error(){
    throw new Error('主动抛出错误')
  }
}
```

然后找到node-core/mods/index.ts进行模块导出

```typescript
//测试
export { test } from "./cmdMod/demoMod/index";
```

最后进入node-core/config/instructionts 进行指令配置,注意key指必须为模块导出的命名

```JSON
  test: {
    alias: "测试",
    recommend: "测试",
    format: "!测试",
    example: "!测试",
  },
```