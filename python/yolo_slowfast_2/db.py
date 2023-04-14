import json
import mysql.connector

# MySQL 데이터베이스와 연결합니다.
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="csedbadmin",
  database="test"
)

# JSON 파일을 읽습니다.
with open('example.json', 'r') as f:
    data = json.load(f)

# JSON 데이터를 파싱합니다.
for item in data:
    name = item['name']
    object1 = item['object']
    timestamp = item['timestamp']
    ava_label = item['ava_label']

    # 파싱한 데이터를 MySQL 데이터베이스에 저장합니다.
    mycursor = mydb.cursor()
    sql = "INSERT INTO video (name, object, timestamp,ava_label) VALUES (%s, %s, %s, %s)"
    val = (name, object1, timestamp, ava_label)
    mycursor.execute(sql, val)
    mydb.commit()

print("Data inserted successfully.")