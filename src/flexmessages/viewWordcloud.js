

function choiceSpan(){
  return {
    "type": "bubble",
    "size": "mega",
    "header": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "のぞいてみよう",
              "color": "#ffffff66",
              "size": "sm"
            },
            {
              "type": "text",
              "text": "期間を選択してね📝",
              "color": "#ffffff",
              "size": "xl",
              "flex": 4,
              "weight": "bold"
            }
          ]
        }
      ],
      "backgroundColor": "#F3A074",
      "spacing": "md",
      "height": "80px",
      "paddingTop": "22px",
      "paddingAll": "20px",
      "alignItems": "center"
    },
    "body": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "1日",
            "text": "一日の結果を見せて！"
          },
          "margin": "lg"
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "1週間",
            "text": "一週間の結果を見せて！"
          }
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "1ヵ月",
            "text": "一ヶ月の結果を見せて！"
          }
        }
      ],
      "spacing": "none",
      "paddingAll": "none",
      "height": "70px",
      "alignItems": "center"
    }
  }
}

module.exports = { choiceSpan };