import { Bot } from "../../instance/types"

export default interface base {
   bot:Bot
   instruction?:string
   run:(...props:any)=>void

}