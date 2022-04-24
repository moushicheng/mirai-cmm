import Mirai from "node-mirai-sdk";
import { messageIsolate } from "../core/contextIsolate";
import { instructionHandler } from "../core/instruction-handler";
export interface Bot{
    name: string;
    instance: Mirai
    contextIsolate: messageIsolate;
    instructionHandler:instructionHandler
} 