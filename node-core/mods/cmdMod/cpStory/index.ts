import { getRandomObj } from "@/helper/index";
import stories from "@/config/stories.json";
import { base } from "@/mods/base";
import { Bot } from "node-core/instance/types";

export class cpStory implements base {
  static instruction = "cp";
  bot: Bot;
  data: string[];
  constructor(bot) {
    this.bot = bot
  }
  action(p1, p2) {
    let story = getRandomObj(stories);
    story = story.replace(/<攻>/g, p1);
    story = story.replace(/<受>/g, p2);
    this.bot.speak(story);
  }
}
