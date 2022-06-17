import { Bot } from "../instance/types"


export interface base{
   bot:Bot
   instruction?:string
   action:(...props:any)=>void
   setMessage?:()=>void
}