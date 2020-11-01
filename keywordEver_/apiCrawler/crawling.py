import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from datetime import datetime


# db 설정 start
client = MongoClient("mongodb://localhost:27017/")
mydb = client['keywordEver']
mycol = mydb['keyword']


def insertRealTime(item):
    if mycol.find_one({'name': item}) == None:
        x = mycol.insert_one({'status': datetime.utcnow(),
                              'keywordName': item, 'amtPc': 0, 'amtMobile': 0, 'amtTotal': 0, 'blogTotal': 0, 'competition': 0,
                               'isCompleteness': False, 'isAmtCompleteness': False})
        print(x.inserted_id)
    else:
        pass


# db 설정 end

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36'}


result = set()

url1 = 'https://datalab.naver.com/keyword/realtimeList.naver?age=all&entertainment=-2&groupingLevel=0&marketing=2&news=-2&sports=-2&where=main'
url2 = 'https://datalab.naver.com/keyword/realtimeList.naver?age=all&entertainment=-2&groupingLevel=0&marketing=-2&news=2&sports=-2&where=main'
url3 = 'https://datalab.naver.com/keyword/realtimeList.naver?age=all&entertainment=2&groupingLevel=0&marketing=-2&news=-2&sports=-2&where=main'
url4 = 'https://datalab.naver.com/keyword/realtimeList.naver?age=all&entertainment=-2&groupingLevel=0&marketing=-2&news=-2&sports=2&where=main'


res = requests.get(url1, headers=headers)

soup = BeautifulSoup(res.content, 'html.parser')

data = soup.select('span.item_title')

for item in data:
    result.add(item.get_text())

res = requests.get(url2, headers=headers)

soup = BeautifulSoup(res.content, 'html.parser')

data = soup.select('span.item_title')

for item in data:
    result.add(item.get_text())

res = requests.get(url3, headers=headers)

soup = BeautifulSoup(res.content, 'html.parser')

data = soup.select('span.item_title')

for item in data:
    result.add(item.get_text())

res = requests.get(url4, headers=headers)

soup = BeautifulSoup(res.content, 'html.parser')

data = soup.select('span.item_title')

for item in data:
    result.add(item.get_text())


for i in result:
    print(i)
    insertRealTime(i)


# print(client.list_database_names())

# print(t)
# print(x.inserted_id)
# db.컬렉션.ensureIndex({status:1}, {expireAfterSeconds:숫자})
