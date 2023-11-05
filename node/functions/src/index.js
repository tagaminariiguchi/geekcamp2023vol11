require("dotenv").config();
const { line, config, client } = require("./lineClient.js");
const { makeReply } = require("./makeReply.js"); // 返信生成用の関数を読み込む
const { howToUseing } = require("./flexmessages/howToUse.js"); // 返信生成用の関数を読み込む
const express = require("express");
const PORT = process.env.EXPRESS_PORT;
const { insertUserId } = require("./database.js");
const functions = require("firebase-functions");
const cors = require("cors");
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post("/webhook", line.middleware(config), (req, res) => {
  console.log(req.body.events);

  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

// イベントの処理　今はテキストにのみ反応
async function handleEvent(event) {
  // メッセージにのみ返信 followではフレックスメッセージを送信
  if (event.type === "message" && event.message.type === "text") {
    // メッセージイベントの処理
    mes = await makeReply(event,client);
  } else if (event.type === "follow") {
    // "follow" イベントの処理
    const userId = event.source.userId; // LINEのユーザーID
    await insertUserId(userId);

    mes = {
      type: "flex",
      altText: "使い方はこちら！🙂",
      contents: howToUseing(),
    }; // howToUseing() 関数を呼び出す
  } else {
    return Promise.resolve(null);
  }

  // メッセージが空の場合は返信無し
  if (mes == null) {
    return Promise.resolve(null);
  }

  // 返信
  return client.replyMessage(event.replyToken, mes);
}

// 指定のポートで起動
// app.listen(PORT);
// console.log(`Server running at ${PORT}`);

// 定期実行
const cron = require("node-cron");
const { postMorningMessage } = require("./regularExecution.js");

//朝9時に実行
cron.schedule("0 0 9 * * *", () => {
  postMorningMessage(client);
});

//Debug用1分に1回実行
// cron.schedule('1 * * * * *', () => {
//     postMorningMessage(client);
// });
exports.line = functions.https.onRequest(app);
