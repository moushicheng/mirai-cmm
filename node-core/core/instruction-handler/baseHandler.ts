import { Bot } from "../../instance/types"

export default interface base {
   run:(...props:any)=>void
   bot:Bot
}