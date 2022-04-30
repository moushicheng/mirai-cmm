// import { Bot } from "../../instance/types";

// export class responserContainer {
//   store: responser[];
//   constructor() {
//     this.store = [];
//     this.initialForGlobalResponser();
//   }
//   addResponser(responser: responser) {
//     this.store.push(responser);
//   }
//   removeResponser(responser: responser) {
//     const index = this.store.findIndex((responserStored: responser) => {
//       responserStored === responser;
//     });
//     this.store.splice(index, 1);
//   }
//   snifferAllResponers() {
//     this.store.forEach((responser) => {
//       responser.run();
//     });
//   }
//   initialForGlobalResponser() {}
// }

// export class responser {
//   status: status;
//   launcher: string;
//   bot: Bot;
//   constructor(bot, isGlobalMode = true) {
//     this.status = null;
//     this.bot = bot;
//     this.launcher = "ANY";
//     if (!isGlobalMode) {
//       this.launcher = this.bot.contextIsolate.message.sender.id;
//     }
//   }
//   changeStatus(status) {
//     this.status = status;
//   }
//   run() {
//     if (
//       this.launcher === "ANY" ||
//       this.bot.contextIsolate.message.sender.id === this.launcher
//     ) {
//       this.status.run(this);
//     }
//   }
// }

// interface status {
//   responser: responser;
//   run: (responser: responser) => void;
// }
// export class endStatus implements status {
//   responser: responser;
//   constructor(responer: responser) {
//     this.responser = responer;
//   }
//   run() {
//     this.responser.bot.responserContainer.removeResponser(this.responser);
//   }
// }
