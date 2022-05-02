import { Bot } from "node-core/instance/types";
import { base } from "../../base";
import axios from "axios";
export class git implements base {
  static instruction = "git查询";
  bot: Bot;
  params: any;
  constructor(bot, params) {
    this.bot = bot;
    this.params = params;
  }
  action(repository, language) {
    if (!repository) {
      this.bot.speak("请填写库名");
      return;
    }

    axios
      .get("https://api.github.com/search/repositories", {
        params: {
          q: language?repository+'language:'+language:repository,
          sort: "starts",
          order: "desc",
          per_page: 3,
          page: 1,
        },
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
        },
      })
      .then((res) => {
        let data = res.data;
        let sen = ``;
        for (const curData of data.items) {
          let {
            full_name,
            html_url,
            description,
            stargazers_count,
            language,
            forks_count,
          } = curData;
          sen += `
  ${full_name}
   【Description】:${description} 
   【Star/Fork】:${stargazers_count}/${forks_count}
   【Language】:${language}
   【Jump】:${html_url}\n`;
        }
        sen = sen.substring(1, sen.length - 1); //去掉开头结尾的换行符
        this.bot.speak(sen);
      });
  }
  error() {
    throw new Error("主动抛出错误");
  }
}
