import Mirai from "node-mirai-sdk";
import { messageIsolate } from "../core/contextIsolate";
import { instructionHandler } from "../core/instruction-handler";
import { responserContainer } from "../core/response";
export interface Bot{
    name: string;
    instance: Mirai
    contextIsolate: messageIsolate;
    instructionHandler:instructionHandler
    responserContainer:responserContainer
    speak:(text:string|any[],message?:Message)=>Promise<any>
} 
export interface Message{
    reply:(text:string)=>void
    sender:{
        id:number
    }

}