from wordcloud import WordCloud
# import matplotlib.pyplot as plt
import base64
# import japanize_matplotlib
from PIL import Image
import numpy as np
import subprocess
import json
# import matplotlib
import io

# ワードクラウドを生成する関数
def create_wordcloud(inputData):
    fpath = "/usr/share/fonts/opentype/ipaexfont-gothic/ipaexg.ttf" # 日本語フォントのパスを指定
    mask_array = np.array(Image.open('./mask.png')) # マスク画像の読み込み

    word_frequencies = json.loads(inputData.text) # json形式のテキストデータを辞書型に変換
    sentiment = inputData.sentiment # 感情分析の結果
    score = inputData.score # 感情分析の結果

    # 感情分析の結果によってワードクラウドの色を変える
    if sentiment == "Positive":
        if(score > 0.5):
            sentiment_color = "autumn"
        else:
            sentiment_color = "spring"
    elif sentiment == "Negative":
        if(score > 0.5):
            sentiment_color = "winter"
        else:
            sentiment_color = "cool"
    else:
        sentiment_color = "summer"
    # print(sentiment_color)

    # ワードクラウドを生成
    wordcloud = WordCloud(font_path=fpath,
                          mask=mask_array,
                          contour_width=3,
                          contour_color="pink",
                          width=800,
                          height=800,
                          background_color='white',
                          colormap=sentiment_color
                          ).generate_from_frequencies(word_frequencies)

    # 画像をPillowのImageオブジェクトに変換
    wordcloud_image = wordcloud.to_image()

    buffer = io.BytesIO()
    wordcloud_image.save(buffer, format='PNG')
    buffer.seek(0)
    image_data = buffer.read()
    base64_data = base64.b64encode(image_data).decode('utf-8')

    return base64_data