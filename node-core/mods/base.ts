import { Bot } from "../instance/types"


export interface base{
   action:(...props:any)=>void
   instruction?:string
}