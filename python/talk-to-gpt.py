import sys
import os
import json
import openai
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv('OPENAI_SECRET_KEY')

messages = json.loads(input())
completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
response = completion.choices[0].message.content

sys.stdout.write(response)
sys.stdout.flush()