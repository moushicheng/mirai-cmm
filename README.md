# welcome
橙萌萌2.0 -基于1.0重构

## for Usage
### 配置
在node-config中先配置oneSpeak.json(没有该文件则创建)，该配置用于报时模块的数据库
```JSON
["一言，用于报时时的提示语，可以是标语，名言或者你任何想表达的东西"]
```
在node-config中配置bot.config.json（没有该文件则创建），用于bot的基础配置
```JSON
    {
        "name": "机器人名字",
        "host": "http://127.0.0.1:8080", //随mirai http插件配置，可以不变
        "verifyKey": "114514233",        //随mirai http插件配置，可以不变
        "qq": 114514,                //机器人qq号
        "INSTRUCTION_SYMBOL":["!", "！"], //指令前缀

        //以下用于报时模块（timer）,用于在指定群内报时
        "timer":{
            "group":123456,  //qq群号,用于报时模块
            "urls":[          
               //报时时会附图，这里一般是图片链接（http)
            ]
        }                    
    }
```
配置instruction.ts（指令配置）
已有基础模板，直接查看node-core/config/instruction.ts即可

### 依赖安装(注意环境)
然后用yarn或者npm安装
```bash
yarn install //or
npm install 
```

### 环境要求
```
按https://github.com/project-mirai/mirai-api-http 配置mcl环境 (需要java)
python 3.x
nodejs 16.0
按 https://github.com/Automattic/node-canvas 配置canvas环境
```

环境配置非常麻烦吧...有问题直接联系仓库主就好了

### 启动
开两个控制台,先启动mcl
```
yarn mcl 
```
再启动dev
```
yarn dev
```