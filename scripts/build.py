import math
import pandas as pd
from jinja2 import Template, Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('./', encoding='utf8'))
tmpl = env.get_template('templates/index.html')

df = pd.read_excel('data/questions.xlsx')
df['進捗'] = df['進捗'].fillna(-1)
df['進捗'] = df['進捗'].astype(int)
progress_max = df['進捗'].max()
for index, row in df.iterrows():
  record = dict()
  if row['進捗'] > 1:
    record['progress'] = round(row['進捗'] / progress_max * 100, 1)
  else:
    record['progress'] = None

  record['current'] = row['ファイル名']
  record['next'] = row['次のファイル名']
  record['type'] = row['type']
  record['name'] = row['名称']
  if record['name'] == 'クトゥルフ診断':
    record['full_title'] = record['name']
  else:
    record['full_title'] = record['name'] + ' | クトゥルフ診断'

  if type(row['ヘッダー']) is str:
    record['header'] = row['ヘッダー']
  else:
    record['header'] = ''

  if pd.isna(row['選択肢']):
    record['choices'] = ''
  else:
    record['choices'] = row['選択肢'].split(',')

  rendered = tmpl.render(record)

  with open(f'docs/{record["current"]}.html', 'w') as f:
    f.write(rendered)
