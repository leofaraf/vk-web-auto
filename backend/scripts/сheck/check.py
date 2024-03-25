import time

import pandas as pd
import datetime
import vk_api
import os
import logging
import json

result = []

data = []

logging.basicConfig(level=logging.INFO, filename='log.log')

with open('orderfull.txt', 'r', encoding='utf8') as file:  # считываем информацию про аккаунты
    for line in file.read().split('\n'):
        data.append(line.split(':'))


for acc in data:
    login = acc[0]
    password = acc[1]
    access_token = 0
    try:
        vk_session = vk_api.VkApi(login=login, password=password, app_id="6287487")
        vk_session.auth()
        vk_session = vk_session.get_api()
        vk_session.account.getInfo()

        with open('vk_config.v2.json', 'r') as data_file:
            data = json.load(data_file)

        for xxx in data[login]['token'].keys():
            for yyy in data[login]['token'][xxx].keys():
                access_token = data[login]['token'][xxx][yyy]['access_token']

        os.remove('vk_config.v2.json')

        result.append([login, access_token, True])
        print(f"[{datetime.datetime.now().strftime('%H-%M-%S')}] Аккаунта {login} жив")
    except Exception as e:
        print(e)
        result.append([login, -1, False])
        print(f"[{datetime.datetime.now().strftime('%H-%M-%S')}] Аккаунта {login} блок")

df = pd.DataFrame(result, columns=['phone_number', 'token', 'status'])
# df.to_excel(f"Статус аккаунтов {datetime.datetime.now().strftime('%H-%M-%S')}.xlsx", index=False)
df.to_excel(f"output.xlsx", index=False)