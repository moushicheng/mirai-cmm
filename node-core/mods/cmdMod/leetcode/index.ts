import { Bot, Message } from "node-core/instance/types";
import {base} from "../../base";
import axios from "axios";
const group=[]
export class leetcode implements base{
  static instruction='力扣每日一题推荐'
  bot:Bot
  params:any
  message: Message
  constructor(bot){
    this.bot=bot;
  }
  async action(){
     const data=await this.getData();
     this.bot.speak(data,this.message)
  }
  getData(){
    return axios.get('https://leetcode-cn.com/graphql/',{
      params:{
        query:'\n    query questionOfToday {\n  todayRecord {\n    date\n    userStatus\n    question {\n      questionId\n      frontendQuestionId: questionFrontendId\n      difficulty\n      title\n      titleCn: translatedTitle\n      titleSlug\n      paidOnly: isPaidOnly\n      freqBar\n      isFavor\n      acRate\n      status\n      solutionNum\n      hasVideoSolution\n      topicTags {\n        name\n        nameTranslated: translatedName\n        id\n      }\n      extra {\n        topCompanyTags {\n          imgUrl\n          slug\n          numSubscribed\n        }\n      }\n    }\n    lastSubmission {\n      id\n    }\n  }\n}\n    ',
        variables:{}
      }
    }).then(res=>{
      const data=res.data.data.todayRecord[0].question;
      console.log(data);
      return `力扣每日一题推送
https://leetcode.cn/problems/${data.titleSlug}
【题目】${data.frontendQuestionId}.${data.titleCn}
【难度】${data.difficulty}
【通过率】${String(data.acRate).substring(0,5)}`
    })
  }
  async actionInTimer(){
    const data=await this.getData();
    group.forEach(groupId=>{
      this.bot.instance.sendGroupMessage(data,groupId)
    })
  }
  setMessage() {
    this.message = this.bot.contextIsolate.message;
  }
}