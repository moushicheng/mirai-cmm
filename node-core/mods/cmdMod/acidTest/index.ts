import axios from "axios";
import { Bot } from "node-core/instance/types";
import { message } from "node-mirai-sdk";
import {base} from "../../base";
enum STATUS{
    '空',
    '急速 00-05',
    '畅通 05-15',
    '忙碌 15-30',
    '拥堵 30-寄',
    '全寄了'
}
export class acidTest implements base{
  static instruction='核酸检测'
  bot:Bot
  params:any
  message: message;
  constructor(bot,params){
    this.bot=bot;
    this.params=params
    this.setMessage();
  }
  async action(){
     const data=await axios.post('https://queue-situation.checkcoder.com/nucleicAcidQueue/search',{
        areaId:11,
        placeId:1,
        skip:0
     },{
        headers:{
            'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQyMTUsImlhdCI6MTY2OTA3NzA1MSwiZXhwIjoxNjY5MDg0MjUxfQ.Wj2lAOrY_J2IYD2fsOm_uphspx3kMza3fZHVMQP7ni8'
        }
     }).then(res=>res.data.result.nucleicAcidQueueList)
     console.log(data);
     const dataFormatted=data.map(item=>{
        const time=new Date();
        return {
            congestionDegreeId:item.congestionDegreeId,
            text:item.remark,
            time:Math.floor((new Date().valueOf()-new Date(item.createdAt).valueOf())/1000/60)+'分前'
         }
     })
     let speakResult='【核酸排队情况】'
     for(let i=0;i<Math.min(5,dataFormatted.length);i++){
        const item=dataFormatted[i]
       speakResult +=`
     【${item.time}】.【${STATUS[item.congestionDegreeId]}】`
       if(item.text)speakResult+=`.${item.text}`
     }
     this.bot.speak(speakResult,this.message);
  }
  error(){
    throw new Error('主动抛出错误')
  }
  setMessage() {
    this.message = this.bot.contextIsolate.message;
  }
}